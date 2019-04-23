<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Webpatser\Uuid\Uuid;

class Person extends Model
{
    use Sluggable;
    //
	protected $table = 'k_peoples';
	
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
