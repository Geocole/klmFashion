<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{

    protected $fillable = [
        'iso_code',
        'name',
        'phone_code',
        'active'
    ];

    public function scopeActive($query){
        return $query->where('active', '=',1);
    }

    public function state(){
        return $this->hasMany('\App\Models\State','country_id','id')->with('city');
    }

    public function cities(){
        return $this->hasManyThrough(City::class,State::class);
    }

    //
}
