<?php
/**
 * Created by PhpStorm.
 * User: LGeoffroy
 * Date: 04/05/2018
 * Time: 19:20
 */

 namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Type extends Model {

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = [ 'type', 'active' ];


    public function address(){
        return $this->belongsToMany('App\Models\Address');
    }


    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */
}