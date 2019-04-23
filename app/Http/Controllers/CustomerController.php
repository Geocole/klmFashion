<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function dataTable(Request $request){

        //dd($request->all());
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
                ->orwhere('k_peoples.name','like',$request['search'])
                ->orwhere('k_peoples.lastname','like',$request['search'])
                ->orwhere('currencies.name','like',$request['search'])
                ->orwhere('k_peoples.birthday','like',$request['search']);
        })->join('k_peoples','k_peoples.id','=','k_customers.person_id')
            ->join('currencies','currencies.id','=','k_customers.currency_id')
            ->join('languages','languages.id','=','k_customers.language_id')
            ->select('k_customers.id as id',
                    'k_customers.created_at as created_at',
                    'k_peoples.name as name',
                    'k_peoples.lastname as lastname',
                    'k_peoples.birthday as birthday',
                    'currencies.name as currency',
                    'languages.name as language'
            )->orderBy($request['sort'],$request['order'])
            ->skip($request['offset'])
            ->take($request['limit'])
            ->get();



        $total  = Customer::join('k_peoples','k_peoples.id','=','k_customers.person_id')
            ->join('currencies','currencies.id','=','k_customers.currency_id')
            ->join('languages','languages.id','=','k_customers.language_id')
            ->count();
        return ['rows'=>$rows,'total'=>$total];
    }
}
