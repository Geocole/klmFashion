<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Webpatser\Uuid\Uuid;

class Person extends Model
{
    use Sluggable;
    use SoftDeletes;
    //
	protected $table = 'k_people';
    protected $dates = ['deleted_at'];


    public $timestamps = true;
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'gender', 'name', 'lastname', 'birthday', '',
    ];

    /**
     *  Setup model event hooks
     */
    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $model->uuid = (string) Uuid::generate(4);
            $model->created_by = Auth::id();
        });

        self::updating(function($model){
            $model->updated_by = Auth::id();
        });
    }
	
	/**
     * Relationship
     *
     */
	public function user(){
        return $this->hasOne('App\User');
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
                'source' => ['name', 'lastname']
            ]
        ];
    }
}
