<?php
/**
 * Created by PhpStorm.
 * User: LGeoffroy
 * Date: 05/05/2019
 * Time: 12:35
 */

namespace App\Repositories;


use App\Classes\Summary;
use App\Imports\CustomersImport;
use App\Models\Customer;
use App\Models\DataImport;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Validators\RowValidator;

class CustomerRepository
{
    protected $model;
    protected $dataImport;
    protected $rowValidator;

    public function __construct(Customer $customer, DataImport $dataImport, RowValidator $validator)
    {
        $this->model = $customer;
        $this->dataImport = $dataImport;
        $this->rowValidator =$validator;
    }

    public function import($file){
       return $this->store($file, 'Customers', $this->rowValidator);
    }

    public function store( UploadedFile $file, $type, $validator)
    {

        $importer = new CustomersImport(new Summary($file->getClientOriginalName()),$validator);

        $importer->import($file);

        $this->addIssuesFromImportFailures($importer);


        DB::transaction(function () use ($importer, $file, $type) {
            $dataImport = DataImport::create([
                'name' => $file->getClientOriginalName(),
                'type' => $type,
                'summary' => $importer->getSummary(),
            ]);
                $dataImport->addMedia($file)->toMediaCollection('customers-imports');

        });

        return $importer->getSummary()->toJson();
    }

    /**
     * @Purpose
     * Get all failures from importer and
     * add them to summary contentIssues
     *
     * @param CustomersImport $importer
     */
    public function addIssuesFromImportFailures(CustomersImport $importer): void
    {
        foreach ($importer->failures() as $failure) {
            $value = array_key_exists($failure->attribute(), $failure->values())
                ? $failure->values()[$failure->attribute()]
                : null;

            $importer->getSummary()
                ->addContentIssue($failure->errors()[0], $failure->row() + 1, $failure->attribute(), $value);
        }
    }
}