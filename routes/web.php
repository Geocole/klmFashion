<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get("/",function(){
    return view ('welcome');
});
/*
 * Routes for customer section
 */
Route::namespace('Customer')
    ->middleware('auth')
    ->group(function (){
        Route::resource('customers','CustomerController')->except(['show']);
        Route::get('customers/data-table', 'CustomerController@getCustmersForDataTable')->name('customers.data.table');
        Route::post('customers/import', 'ImportController@store')->name('customers.import');
        Route::get('search/customers/{field}/{query}','CustomerController@search');

    });

Route::namespace('Employees')
    ->middleware('auth')
    ->group(function(){
        Route::resource('employees','EmployeesController')->except(['show']);
        Route::get("employees/data","EmployeesController@data");
    });

