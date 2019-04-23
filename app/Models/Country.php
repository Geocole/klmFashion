<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $table = 'country';

    protected $fillable = [
        'sortname',
        'name',
        'phonecode'
    ];

    protected $guarded = [];

    public function state(){
        return $this->hasMany('\App\Models\State','country_id','id')->with('city');
    }

    //
}
