<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Webpatser\Uuid\Uuid;

class Commande extends Model{
    use SoftDeletes;

    protected $table= 'k_commandes';


    protected $guarded= ['id','uuid'];

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


    public function scopeCompleted($query){

        return $query->whereStatus(1);
    }

    public function customer(){
        return $this->belongsTo(Customer::class);
    }


}