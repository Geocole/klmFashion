<?php
/**
 * Created by PhpStorm.
 * User: LGeoffroy
 * Date: 20/04/2019
 * Time: 16:22
 */

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Webpatser\Uuid\Uuid;

class Item extends Model
{

    protected $table = 'k_items';
    protected $fillable = [ 'commande_id',
                            'model_id',
                            'mesures',
                            'tasks',
                            'materials',
                            'price'];


    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'mesures' => 'array',
        'tasks' => 'array',
        'materials' => 'array',
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

    public function materials(){
        return $this->materials->map(function ($material){
            return Material::where('slug',$material)->first();
        });
    }


    public function kmodel()
    {
        return $this->belongsTo('KModel');
    }




}