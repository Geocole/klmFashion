<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Imports\CustomersImport;
use App\Models\Address;
use App\Models\Customer;
use App\Models\Person;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class CustomerController extends Controller
{
    /**
     * Constructor
     */

    public function __construct()
    {

        $this->middleware('auth');

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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CustomerRequest $request)
    {
        /*$person = new Person();
        $person->name = $request['name'];
        $person->lastname = $request['lastname'];
        $person->gender = $request['gender'];*/

        $address = new Address();
        $address->phone_regular = $request['phone_regular'];
        $address->address1 =$request['address1'];
        $address->address2 =$request['address2'];
        $address->postcode = $request['postcode'];
        $address->country_id =$request['country_id'];
        $address->city_id =$request['city_id'];
        $address->email =$request['email'];

        $customer = new Customer();
        $customer->currency_id = $request['currency_id'];
        $customer->language_id = $request['language_id'];

      DB::beginTransaction();

      try{
          $person = Person::create($request->only([
              'name',
              'lastname',
              'gender']));

          $customer->person()->associate($person);
          $customer->save();

          $customer->addresses()->save($address);

      }catch(\Exception $ex){
          DB::rollback();

          return response()->json('Une erreur s\'est produite',422);
      }

      DB::commit();

      return response()->json('Success');

    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $customer = Customer::find($id)->load('address')->load('person');

        return view('customers.edit')->with('customer',$customer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $customer = Customer::find($id)->load('address')->load('person');

        $address = $customer->address;

        $person = $customer->person;

        DB::beginTransaction();

        try{
            $customer->update([
                'language_id'=> $request['language_id'],
                'currency_id' => $request['currency_id']
            ]);

            $person->update([
                'name' => $request['name'],
                'lastname' =>$request['lastname'],
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

        }catch (\Exception $ex){

            DB::rollBack();

            return response()->json('Une erreur s\'est produite',422);

        }

        DB::commit();

        return response()->json('Success');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::beginTransaction();

        try{

        $customer = Customer::find($id)->load('addresses')->load('person');

        $person = $customer->person;

        $addresses = $customer->addresses;

        $person->delete();

        foreach($addresses as $address){

            $address->delete();

        }

        $customer->delete();

        }catch (\Exception $ex){

            DB::rollBack();

            return response()->json('Une erreur s\'est produite',422);

        }

        DB::commit();

        return response()->json('Success');

    }

    public function dataTable(Request $request){

        if(!isset($request['order'])){

            if($request['order']!='desc')

                $request['order']='desc';

        }

        if(!isset($request['search'])){

            if($request['search']!='%%')

                $request['search']='%%';

        }else{

            $request['search']='%'.$request['search'].'%';

        }

        if(!isset($request['filter'])){

            $request['filter'] = [];

        }else{

            unset($request['status']);

            $request['filter'] = json_decode($request['filter'],true);

        }

        if(!isset($request['sort'])){

            if($request['sort']!='id')

                $request['sort']='id';

        }

        $rows = Customer::where(function($query) use($request){

            $query
                ->orwhere('k_people.name','like',$request['search'])
                ->orwhere('k_people.lastname','like',$request['search'])
                ->orwhere('currencies.name','like',$request['search'])
                ->orwhere('addresses.address1','like',$request['search'])
                ->orwhere('addresses.phone_regular','like',$request['search'])
                ->orwhere('addresses.email','like',$request['search'])
                ->orwhere('cities.name','like',$request['search'])
                ->orwhere('countries.name','like',$request['search']);

        })->join('k_people','k_people.id','=','k_customers.person_id')
            ->join('currencies','currencies.id','=','k_customers.currency_id')
            ->join('languages','languages.id','=','k_customers.language_id')
            ->leftJoin('addresses',function ($join){

                $join->on('addresses.addressable_id','=','k_customers.id')

                    ->where('addresses.addressable_type','=',Customer::class)

                    ->where('addresses.alias','=','Main Address');

            })
            ->join('cities','cities.id','=','addresses.city_id')
            ->join('countries','countries.id','=','addresses.country_id')
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
            ->orderBy('k_customers.'.$request['sort'],$request['order'])
            ->skip($request['offset'])
            ->take($request['limit'])
            ->get();

        $total  = Customer::join('k_people','k_people.id','=','k_customers.person_id')
            ->join('currencies','currencies.id','=','k_customers.currency_id')
            ->join('languages','languages.id','=','k_customers.language_id')
            ->count();

        return ['rows'=>$rows,'total'=>$total];

    }

    public function test(){
        Excel::import(new CustomersImport(), 'template.xlsx');
    }
}
