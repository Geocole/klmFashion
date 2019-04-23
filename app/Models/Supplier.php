<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Webpatser\Uuid\Uuid;

class Supplier extends Model
{
    //
	use Sluggable;
	
	 protected $table = 'k_suppliers';
	 
	 public $timestamps = true;
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'reference', 'barcode_symbol', 'status', 
    ];
	
	/**
     * Relationship
     *
     */
	 
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
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return[
            'slug' => [
                'source' => ['name', 'categoriy.name','sex_ref']
            ]
        ];
    }
	 
	 
}
