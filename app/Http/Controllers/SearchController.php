<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Currency;
use App\Models\Language;
use http\Env\Response;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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

    public function langueSearch(Request $request){
        if($request->ajax()){

            return response()->json(Language::active()->get());
        }

        return \response('Error',404);

    }

    public function currencySearch(Request $request){
        if($request->ajax()){

            return response()->json(Currency::active()->get());
        }

        return \response('Error',404);

    }

    public function countrySearch(Request $request){
        if($request->ajax()){
            return response()->json(Country::active()->get());
        }

        return \response('Error',404);

    }

    public function citiesSearch(Request $request){
        if($request->ajax()){
            $datas = Country::find($request['countryID'])->load('cities');
            return response()->json($datas->cities);
        }

        return \response('Error',404);

    }
}
