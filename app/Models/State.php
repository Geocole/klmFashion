<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    protected $table = 'state';

    protected $fillable = [
        'name',
        'country_id',
        'iso_code',
        'active'
    ];

    protected $guarded = [];


    public static $rules = array(
        'name'     => array('required', 'min:2', 'max:64'),
        'iso_code' => array('max:7'),
    );


    /**
     * Find ISO Code
     *
     */
    public static function findByIsoCode($code)
    {
        return self::where('iso_code', $code)->first();
    }


    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */
    public function city(){
        return $this->hasMany('\App\Models\City')->take(10);
    }

    public function country(){
        return $this->belongsTo('\App\Models\Contry');
    }

}
