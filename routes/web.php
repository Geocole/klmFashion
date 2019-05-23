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

Route::get('/', 'HomeController@index')->name('home');

/*
 * Routes for customer section
 */
Route::namespace('Customer')
    ->middleware('auth')
    ->group(function (){
        Route::post('customers/import', 'ImportController@store')->name('customers.import');

        Route::resource('customers','CustomerController')->except(['create','show']);
        Route::get('customers/data-table', 'CustomerController@dataTable')->name('customers.data.table');

    });
