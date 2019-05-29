<?php

namespace App\Traits\DataTable;

use App\Models\Customer;
use Illuminate\Http\Request;

trait HasCustomerDataTable
{
    public function dataTable(Request $request)
    {
        if (!isset($request['order'])) {
            if ($request['order'] != 'desc') {
                $request['order'] = 'desc';
            }
        }

        if (!isset($request['search'])) {
            if ($request['search'] != '%%') {
                $request['search'] = '%%';
            }
        } else {
            $request['search'] = '%' . $request['search'] . '%';
        }

        if (!isset($request['filter'])) {
            $request['filter'] = [];
        } else {
            unset($request['status']);
            $request['filter'] = json_decode($request['filter'], true);
        }

        if (!isset($request['sort'])) {
            if ($request['sort'] != 'id') {
                $request['sort'] = 'id';
            }
        }

        $rows = Customer::where(function ($query) use ($request) {
            $query
                ->orwhere('k_people.name', 'like', $request['search'])
                ->orwhere('k_people.lastname', 'like', $request['search'])
                ->orwhere('currencies.name', 'like', $request['search'])
                ->orwhere('addresses.address1', 'like', $request['search'])
                ->orwhere('addresses.phone_regular', 'like', $request['search'])
                ->orwhere('addresses.email', 'like', $request['search'])
                ->orwhere('cities.name', 'like', $request['search'])
                ->orwhere('countries.name', 'like', $request['search']);
        })->join('k_people', 'k_people.id', '=', 'k_customers.person_id')
            ->join('currencies', 'currencies.id', '=', 'k_customers.currency_id')
            ->join('languages', 'languages.id', '=', 'k_customers.language_id')
            ->leftJoin('addresses', function ($join) {
                $join->on('addresses.addressable_id', '=', 'k_customers.id')
                    ->where('addresses.addressable_type', '=', Customer::class)
                    ->where('addresses.alias', '=', 'Main Address');
            })
            ->join('cities', 'cities.id', '=', 'addresses.city_id')
            ->join('countries', 'countries.id', '=', 'addresses.country_id')
            ->select('k_customers.id as id',
                'k_customers.created_at as created_at',
                'k_people.name as name',
                'k_people.lastname as lastname',
                'k_people.gender as gender',
                'addresses.address1 as address1',
                'addresses.phone_regular as phone_regular',
                'addresses.email as email',
                'cities.name as city',
                'countries.name as country',
                'currencies.name as currency',
                'languages.name as language'
            )
            ->orderBy('k_customers.' . $request['sort'], $request['order'])
            ->skip($request['offset'])
            ->take($request['limit'])
            ->get();

        $total = Customer::join('k_people', 'k_people.id', '=', 'k_customers.person_id')
            ->join('currencies', 'currencies.id', '=', 'k_customers.currency_id')
            ->join('languages', 'languages.id', '=', 'k_customers.language_id')
            ->count();

        return ['rows' => $rows, 'total' => $total];
    }
}