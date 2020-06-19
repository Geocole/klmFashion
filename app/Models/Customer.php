<?php

namespace App\Models;

use App\Traits\AddressTrait;
use App\Traits\PersonTrait;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Webpatser\Uuid\Uuid;

class Customer extends Model{

    use AddressTrait, PersonTrait,Sluggable;

    use SoftDeletes;
    protected $table= 'k_customers';

    protected $dates = ['deleted_at'];

    protected $guarded= ['id','uuid','slug'];

    /**
     *  Setup model event hooks
     */
    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $model->uuid = (string) Uuid::generate(4);
        });
    }

 
    public function address(){
        return $this->morphOne(Address::class,'addressable')->where('alias','=','Main Address');
    }

    public function commandes(){

        return $this->hasMany(Commande::class,'customer_id');
    }

    public function currency(){
        return $this->hasOne(Currency::class,'currency_id');
    }
    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return[
            'slug' => [
                'source' => ['person.name', 'person.lastname']
            ]
        ];
    }
}