<?php
/**
 * Created by PhpStorm.
 * User: LGeoffroy
 * Date: 20/04/2019
 * Time: 16:10
 */

namespace App\Traits;


use App\Models\Person;

trait PersonTrait
{
    public function person(){
        return $this->belongsTo(Person::class);
    }
}