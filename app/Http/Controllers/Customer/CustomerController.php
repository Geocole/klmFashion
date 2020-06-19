<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerRequest;
use App\Models\Address;
use App\Models\Customer;
use App\Models\Person;
use App\Repositories\CustomerRepository;
use App\Traits\DataTable\HasCustomerDataTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {
            //dd($request->ajax());
            $languages=DB::table('languages')->select("*")->get();
            $currencies=DB::table("currencies")->select("currencies.id","currencies.name","currencies.sign")->distinct()->get();
            $genders=DB::table("k_peoples")->select("gender")->distinct()->get();
            $countries=DB::table("countries")->select("countries.id","countries.name_fr")->get();
            $cities=DB::table('cities')->select("cities.id","cities.name")->get();
            $data=DB::table("k_customers")
            ->join('k_peoples', 'k_peoples.id', '=', 'k_customers.person_id')
                ->join('currencies', 'currencies.id', '=', 'k_customers.currency_id')
                ->join('languages', 'languages.id', '=', 'k_customers.language_id')
                ->leftJoin('addresses', function ($join) {
                    $join->on('addresses.addressable_id', '=', 'k_customers.id')
                        ->where('addresses.addressable_type', '=', Customer::class)
                        ->where('addresses.alias', '=', 'Main Address');
            })->select(
                'k_customers.id as id',
                'k_peoples.name as name',
                'k_peoples.lastname as lastname',
                'k_peoples.gender as gender',
                'addresses.address1 as address1',
                'addresses.phone_regular as phone_regular',
                'addresses.email as email',
                'currencies.name as currency',
                'languages.name as language',
                'k_customers.created_at as created_at',
                'k_customers.updated_at as updated_at'
            )->paginate(7);
        return view('customers.index',
        [ 'data'=>$data ,"cities"=>$cities,'countries'=>$countries,'genders'=>$genders,"currencies"=>$currencies,"languages"=>$languages]);        
    }

    public function search($query,$request)
    {
        dd($request);
        $search = Customer::where(function ($query) use ($request) {
            $query
                ->orwhere('k_peoples.name', 'like', $request)
                ->orwhere('k_peoples.lastname', 'like', $request)
                ->orwhere('currencies.name', 'like', $request)
                ->orwhere('addresses.address1', 'like', $request)
                ->orwhere('addresses.phone_regular', 'like', $request)
                ->orwhere('addresses.email', 'like', $request);
        })
        ->join('k_peoples', 'k_peoples.id', '=', 'k_customers.person_id')
            ->join('currencies', 'currencies.id', '=', 'k_customers.currency_id')
            ->join('languages', 'languages.id', '=', 'k_customers.language_id')
            ->leftJoin('addresses', function ($join) {
                $join->on('addresses.addressable_id', '=', 'k_customers.id')
                    ->where('addresses.addressable_type', '=', Customer::class)
                    ->where('addresses.alias', '=', 'Main Address');
            })
            ->join('cities', 'cities.id', '=', 'addresses.city_id')
            ->join('countries', 'countries.id', '=', 'addresses.country_id')
            ->select(
                'k_customers.id as id',
                'k_customers.created_at as created_at',
                'k_peoples.name as name',
                'k_peoples.lastname as lastname',
                'k_peoples.gender as gender',
                'addresses.address1 as address1',
                'addresses.phone_regular as phone_regular',
                'addresses.email as email',
                'cities.name as city',
                'countries.name_fr_fr_fr as country',
                'currencies.name as currency',
                'languages.name as language'
            )
        ->get()
        ->latest()
        ->paginate(10);
    }
    public function create(){
        
        $languages=DB::table('languages')->select("*")->get();
        $currencies=DB::table("currencies")->select("currencies.id","currencies.name","currencies.sign")->distinct()->get();
        $genders=DB::table("k_peoples")->select("gender")->distinct()->get();
        $countries=DB::table("countries")->select("countries.id","countries.name_fr")->get();
        $cities=DB::table('cities')->select("cities.id","cities.name")->get();
       
        return view ("customers.create")
        ->with( 
            ["cities"=>$cities,'countries'=>$countries,'genders'=>$genders,
            "currencies"=>$currencies,"languages"=>$languages]
        );
    }
    /*
    public function getCustmersForDataTable(Request $request){
        $table=DB::table("k_customers")
        ->join('k_peoples', 'k_peoples.id', '=', 'k_customers.person_id')
            ->join('currencies', 'currencies.id', '=', 'k_customers.currency_id')
            ->join('languages', 'languages.id', '=', 'k_customers.language_id')
            ->leftJoin('addresses', function ($join) {
                $join->on('addresses.addressable_id', '=', 'k_customers.id')
                    ->where('addresses.addressable_type', '=', Customer::class)
                    ->where('addresses.alias', '=', 'Main Address');
            })
            ->select('k_customers.id as id',
                'k_customers.created_at as created_at',
                'k_peoples.name as name',
                'k_peoples.lastname as lastname',
                'k_peoples.gender as gender',
                'addresses.address1 as address1',
                'addresses.phone_regular as phone_regular',
                'addresses.email as email',
                'currencies.name as currency',
                'languages.name as language'
            )->paginate(10);
        return $table;  
        }
    
    */
    /**
     * Store a newly created resource in storage.
     *
     * @param CustomerRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CustomerRequest $request)
     {
        dd($request->input());
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
            $customer->addresses()->save($address);
            $customer->save();

        } catch (\Exception $ex) {
            dd($ex);
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
        $languages=DB::table('languages')->select("*")->get();
        $currencies=DB::table("currencies")
            ->select("currencies.id","currencies.name","currencies.sign")
            ->distinct()
            ->get();
        $genders=DB::table("k_peoples")->select("gender")->distinct()->get();
        $countries=DB::table("countries")->select("countries.id","countries.name_fr")->get();
        $cities=DB::table('cities')->select("cities.id","cities.name")->get();
        $customer = Customer::find($id)->load('address')->load('person');
        //return response()->json($customer);
        // dd($customer);
        return view('customers.edit')
        ->with( ['customer'=>$customer,"cities"=>$cities,'countries'=>$countries,
        'genders'=>$genders,"currencies"=>$currencies,'languages'=>$languages]);
    }
    public function show($id){
        /*
        $customer = Customer::findOrFail($id)->load('address')->load('person');;        
        return view('customers.edit','customer'=>$customer);*/
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
        $customer = Customer::find(intval($id))->load('address')->load('person');
        $address = $customer->address;
        $person = $customer->person;
      //  dd($customer->address);

        DB::beginTransaction();
        try {

            if($address==NULL){

                $customer->update([
                    'language_id' => $request['language_id'],
                    'currency_id' => $request['currency_id']
                ]);

                $person->update([
                    'name' => $request['name'],
                    'lastname' => $request['lastname'],
                    'gender' => $request['gender']
                ]);
    
            }
            if($person==NULL){

                $customer->update([
                    'language_id' => $request['language_id'],
                    'currency_id' => $request['currency_id']
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
    
            }
            if($address==NULL && $person ==NULL){

                $customer->update([
                    'language_id' => $request['language_id'],
                    'currency_id' => $request['currency_id']
                ]);
            }
            if($address && $person){

                $customer->update([
                    'language_id' => $request['language_id'],
                    'currency_id' => $request['currency_id']
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

                $person->update([
                    'name' => $request['name'],
                    'lastname' => $request['lastname'],
                    'gender' => $request['gender']
                ]);

            }

        } catch (\Exception $ex) {
            DB::rollBack();
            return dd($ex);
            //response()->json('Une erreur s\'est produite', 422);
        }

        DB::commit();
        return redirect("/customers")->with('success', 'Contact updated!');;
        //return response()->json('Success');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {   
       // dd(Customer::findOrFail(intval($id)));
        DB::beginTransaction();

        try {
            /*
            $customer = Customer::findOrFail(intval($id))->with('addresses')->with('person');
            dd($customer);
            $customer->person->delete();
            $customer->address()->delete();
            $customer->delete();*/

            $customer=DB::table('k_customers')->where('id','=',intval($id))->delete();
            // $person=DB::table('k_peoples')->where('k_peoples.id','=',intval($id))->get();
            
            $address=DB::table('addresses')->where('addressable_id','=',intval($id))->delete();
            
        } catch (\Exception $ex) {
            DB::rollBack();
            return dd($ex); 
            //response()->json('Une erreur s\'est produite', 422);
        }

        DB::commit();
        return redirect("/customers")->with("success","Delete successed");
        //return response()->json('Success');
    }
}
