<?php
/**
 * Created by PhpStorm.
 * User: LGeoffroy
 * Date: 20/04/2019
 * Time: 14:40
 */

namespace App\Models;


use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{

    use Sluggable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $table= 'k_materials';

    protected $fillable = [
        'name', 'brand_id', 'categorie_id',
        'last_purchase_cost','purchase_cost',
        'unit','barcode_symbol','material_code',
        'stock_quantity','alert_quantity'
    ];


    public function brand(){

        return $this->belongsTo(Brand::class);
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
                'source' => ['name', 'material_code']
            ]
        ];
    }
}