<?php
namespace App\Models;
use Cviebrock\EloquentSluggable\Sluggable;
use \Illuminate\Database\Eloquent\Model;

class Brand extends Model{

    use Sluggable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code', 'name', 'slug',
    ];


    public function material(){

        return $this->hasMany(Material::class);
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
                'source' => ['name']
            ]
        ];
    }
}