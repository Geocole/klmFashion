<?php

namespace App\Imports;

use App\Models\Address;
use App\Models\Customer;
use App\Models\Person;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Row;

class CustomersImport implements OnEachRow, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function onRow(Row $row)
    {
      $row = $row->toArray();
        $address = new Address();
        $address->phone_regular = $row['phone_regular'];
        $address->address1 =$row['address1'];
        $address->address2 =$row['address2'];
        $address->postcode = $row['postcode'];
        $address->country_id =$row['country_id'];
        $address->city_id =$row['city_id'];
        $address->email =$row['email'];

        $customer = new Customer();
        $customer->currency_id = $row['currency_id'];
        $customer->language_id = $row['language_id'];

        $person = new Person();
        $person->name = $row['name'];
        $person->lastname = $row['lastname'];
        $person->gender = 'H';

        DB::beginTransaction();

        try{
            $person->save();

            $customer->person()->associate($person);
            $customer->save();

            $customer->addresses()->save($address);

            dd($customer);
        }catch(\Exception $ex){

            dd($ex);

            DB::rollback();

        }

        //DB::commit();

    }
}
