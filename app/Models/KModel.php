<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Webpatser\Uuid\Uuid;

class KModel extends Model
{
    use Sluggable;
    //
	protected $table = 'k_models';
	
	public $timestamps = true;
	
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'sex_ref',
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

	
	public function category()
    {
        return $this->belongsTo(Category::class);
    }


    public function item()
    {
        return $this->hasMany(Item::class, 'model_id', 'id');
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
