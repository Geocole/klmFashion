<?php
/**
 * Created by PhpStorm.
 * User: LGeoffroy
 * Date: 05/05/2019
 * Time: 12:35
 */

namespace App\Repositories;


use App\Models\Customer;
use App\Models\DataImport;

class CustomerRepository
{
    protected $model;
    protected $dataImport;

    public function __construct(Customer $customer, DataImport $dataImport)
    {
        $this->model = $customer;
        $this->dataImport = $dataImport;
    }

    public function import(){
       return $this->dataImport->store('template.xlsx', 'Customers');
    }
}