<?php

namespace App\Http\Controllers\Employees;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Traits\PersonTrait;
use App\RoleEmployee;
use App\Task;
use App\Traits\AddressTrait;

use Illuminate\Support\Facades\DB;
class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
     return view("employees.index");
    }

    public function data(){
       return $employees=DB::table("k_employees")
       ->join('k_peoples','k_peoples.id','=','k_employees.person_id')
       ->join('k_role_employees','k_role_employees.id','=','k_employees.role_id')
       ->select(
           'k_employees.id as id', 
           'k_peoples.name as name',
          'k_peoples.lastname as lastname',
          'k_role_employees.name as role',
          'k_employees.created_at as created_at',
          'k_employees.updated_at as updated_at'
       )->get();
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
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {  
         $employee=Employee::find($id)->load('person')->load('role'); 
        return view('employees.edit',$employee);     
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
}
