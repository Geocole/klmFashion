<?php

namespace App\Traits\DataTable;

use App\Models\Employee;
use Illuminate\Http\Request;

trait HasemployeeDataTable
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

        $rows = Employee::where(function ($query) use ($request) {
            $query
                ->orwhere('k_people.name', 'like', $request['search'])
                ->orwhere('k_people.lastname', 'like', $request['search'])
                ->orwhere('roles.name', 'like', $request['search'])
                ->orwhere('addresses.email', 'like', $request['search']);
        })->join('k_people', 'k_people.id', '=', 'k_employees.person_id')
            ->join('currencies', 'currencies.id', '=', 'k_employees.currency_id')
            ->leftJoin('addresses', function ($join) {
                $join->on('addresses.addressable_id', '=', 'k_employees.id')
                    ->where('addresses.addressable_type', '=', Employee::class)
                    ->where('addresses.alias', '=', 'Main Address');
            })
            ->select('k_employees.id as id',
                'k_employees.created_at as created_at',
                'k_people.name as name',
                'k_people.lastname as lastname',
                'k_people.gender as gender',
                'addresses.address1 as address1',
                'addresses.phone_regular as phone_regular',
                'addresses.email as email'
            )
            ->orderBy('k_employees.' . $request['sort'], $request['order'])
            ->skip($request['offset'])
            ->take($request['limit'])
            ->get();

        $total = Employee::join('k_people', 'k_people.id', '=', 'k_employees.person_id')
            ->count();

        return ['rows' => $rows, 'total' => $total];
    }
}