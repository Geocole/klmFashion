<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Image extends Model
{
    use SoftDeletes;

    protected $table = 'images';

    public $timestamps = true;

    protected $fillable = [
        'caption',
        'extension',
        'active',
        'imageable_id',
        'imageable_type',
        'image_size'
    ];

    protected $dates = ['deleted_at'];




    //
}
