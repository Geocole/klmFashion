<?php

namespace App\Imports;

use App\Classes\Summary;
use App\Models\Address;
use App\Models\City;
use App\Models\Country;
use App\Models\Currency;
use App\Models\Customer;
use App\Models\Language;
use App\Models\Person;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsErrors;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Exceptions\RowSkippedException;
use Maatwebsite\Excel\Validators\RowValidator;
use Maatwebsite\Excel\Validators\ValidationException;

class CustomersImport implements ToCollection, WithValidation, WithHeadingRow, SkipsOnFailure, SkipsOnError
{
    use Importable, SkipsFailures, SkipsErrors;

    /*
     * Summary
     */
    protected $summary;

    protected $index = 0;

    /**
     * Maatwebsite\Excel default Validator for rows validation
     *
     * Maatwebsite\Excel\Validators\RowValidator
     */
    protected $rowValidator;

    /*
     * Construct
     */
    public function __construct(Summary $summary, RowValidator $validator)
    {
        $this->summary = $summary;
        $this->rowValidator = $validator;
    }

    /**
     * @param Collection $rows
     * @return void
     * @throws ValidationException
     */
    public function collection(Collection $rows)
    {
        // Validate each row before it's inserted into the database.
        // @see  Maatwebsite\Excel\Validators\RowValidator
        // for the behavior of the validator function
        try {
            $this->rowValidator->validate($rows->toArray(), $this);
        } catch (RowSkippedException $e) {
            foreach ($e->skippedRows() as $row) {
                unset($rows[$row]);
            }
        }

        foreach ($rows as $row)
       {
           $row = $row->toArray();
           $address = new Address();
           $address->phone_regular = $row['phone_regular'];
           $address->address1 = $row['address1'];
           $address->address2 = $row['address2'];
           $address->postcode = $row['postcode'];
           $address->country_id = Country::where('name', $row['country'])->first()->id;
           $address->city_id = City::where('name', $row['city'])->first()->id;
           $address->email = $row['email'];

           //dd($address);

           $customer = new Customer();
           $customer->currency_id = Currency::where('iso_code', $row['currency'])->first()->id;
           $customer->language_id = Language::where('iso_code', $row['language'])->first()->id;

           $person = new Person();
           $person->name = $row['name'];
           $person->lastname = $row['lastname'];
           $person->gender = $row['gender'] == 'H'? 'H': 'F';

           DB::beginTransaction();

           try {
               $person->save();
               $customer->person()->associate($person);
               $customer->save();
               $customer->addresses()->save($address);
               $this->incSuccess();
           } catch (\Exception $ex) {
               $this->summary->addContentIssue( $ex->getMessage(), $this->index + 2, null, null);
               DB::rollback();
           }
           $this->index++;
           DB::commit();
       }
    }

    public function incSuccess()
    {
        $this->summary->incSuccess();
    }

    public function getSummary()
    {
        return $this->summary;
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|max:150',
            'lastname' => 'required|max:255',
            'email' => 'sometimes|required|email|unique:addresses',
            'phone_regular' => 'required|max:20|unique:addresses',
            'address1' => 'required|max:150',
            'address2' => 'sometimes|max:150',
            'country' => 'required|string|exists:countries,name',
            'city' => 'required|string|exists:cities,name',
            'language' => 'required|string|exists:languages,iso_code',
            'currency' => 'required|string|exists:currencies,iso_code',
            'gender' => [
                'required',
                Rule::in(['H','F']),
            ],
            'postcode' => 'sometimes|max:50'
        ];
    }
}
