<?php
/**
 * Created by PhpStorm.
 * User: LGeoffroy
 * Date: 05/05/2019
 * Time: 12:17
 */

namespace App\Traits;


trait CreatedBy
{
    protected static function bootCreatedBy()
    {
        self::creating(function ($model) {
            $model->created_by = optional(auth()->user())->id;
        });
    }

    public function createdBy() : Relation
    {
        return $this->belongsTo(
            config('auth.providers.users.model'), 'created_by'
        );
    }
}