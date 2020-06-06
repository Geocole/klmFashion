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

Route::get('/logout',function(){
    Session::flush();
    Auth::logout();
    return Redirect::to("/login")
      ->with('message', array('type' => 'success', 'text' => 'You have successfully logged out'));
});

Route::get('/profile',function(){
    return view('profile');
});
Route::post('/edit','ProfileController@update');

/*
 * Routes for customer section
 */
Route::namespace('Customer')
    ->middleware('auth')
    ->group(function (){
        Route::resource('customers','CustomerController')->except(['create','show']);
        Route::post('customers/import', 'ImportController@store')->name('customers.import');
        Route::get('customers/data-table', 'CustomerController@dataTable')->name('customers.data.table');
    });

    Route::namespace('Employee')
    ->middleware('auth')
    ->group(function (){
        Route::resource('employees','EmployeeController')->except(['create']);
        Route::post('employees/import', 'ImportController@store')->name('employees.import');
        Route::get('employees/data-table', 'EmployeeController@dataTable')->name('employees.data.table');
    });
