<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class Category extends Model{

    use Sluggable;

    protected $table = 'k_categories';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'category_description', 'name', 'is_root',
        'type','parent_id'
    ];

    /*
     * Relationships
     *
     */


    public function categorie(){

        return self::find($this->parent_id);
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
                'source' => ['name', 'type']
            ]
        ];
    }
}