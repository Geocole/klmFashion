<?php

namespace App\Http\Controllers;

use App\Classes\Summary;
use App\Http\Requests\CustomerRequest;
use App\Imports\CustomersImport;
use App\Models\Address;
use App\Models\Customer;
use App\Models\Person;
use App\Repositories\CustomerRepository;
use App\Traits\DataTable\HasCustomerDataTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class CustomerController extends Controller
{
    use HasCustomerDataTable;

    protected $repository;

    /**
     * Constructor
     * @param CustomerRepository $repository
     */
    public function __construct(CustomerRepository $repository)
    {
        $this->middleware('auth');

        $this->repository =$repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('customers.index');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CustomerRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CustomerRequest $request)
    {
        $address = new Address();
        $address->phone_regular = $request['phone_regular'];
        $address->address1 = $request['address1'];
        $address->address2 = $request['address2'];
        $address->postcode = $request['postcode'];
        $address->country_id = $request['country_id'];
        $address->city_id = $request['city_id'];
        $address->email = $request['email'];

        $customer = new Customer();
        $customer->currency_id = $request['currency_id'];
        $customer->language_id = $request['language_id'];

        DB::beginTransaction();

        try {
            $person = Person::create($request->only([
                'name',
                'lastname',
                'gender'
            ]));

            $customer->person()->associate($person);
            $customer->save();
            $customer->addresses()->save($address);
        } catch (\Exception $ex) {
            DB::rollback();

            return response()->json('Une erreur s\'est produite', 422);
        }

        DB::commit();

        return response()->json('Success');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $customer = Customer::find($id)->load('address')->load('person');

        return view('customers.edit')->with('customer', $customer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $customer = Customer::find($id)->load('address')->load('person');

        $address = $customer->address;

        $person = $customer->person;

        DB::beginTransaction();

        try {
            $customer->update([
                'language_id' => $request['language_id'],
                'currency_id' => $request['currency_id']
            ]);

            $person->update([
                'name' => $request['name'],
                'lastname' => $request['lastname'],
                'gender' => $request['gender']
            ]);

            $address->update([
                'phone_regular' => $request['phone_regular'],
                'address1' => $request['address1'],
                'address2' => $request['address2'],
                'postcode' => $request['postcode'],
                'country_id' => $request['country_id'],
                'city_id' => $request['city_id'],
                'email' => $request['email']
            ]);

        } catch (\Exception $ex) {

            DB::rollBack();

            return response()->json('Une erreur s\'est produite', 422);

        }

        DB::commit();

        return response()->json('Success');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::beginTransaction();

        try {

            $customer = Customer::find($id)->load('addresses')->load('person');

            $customer->person->delete();

            $customer->addresses->delete();

            $customer->delete();

        } catch (\Exception $ex) {

            DB::rollBack();

            return response()->json('Une erreur s\'est produite', 422);
        }

        DB::commit();

        return response()->json('Success');
    }

    public function test()
    {
        return response()->json($this->repository->import());
    }
}
