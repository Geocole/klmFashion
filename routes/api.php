<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/languages', 'SearchController@langueSearch')->name('languages');
Route::get('/currencies', 'SearchController@currencySearch')->name('currencies');
Route::get('/countries', 'SearchController@countrySearch')->name('countries');
Route::get('/cities', 'SearchController@citiesSearch')->name('countries');
