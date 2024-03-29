<?php
namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class Mesure extends Model{

    use Sluggable;
    protected $table = 'k_mesures';

    protected $fillable= ['name','unit'];


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