<?php

namespace App;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class RoleEmployee extends Model
{
    use Sluggable;
	protected $table = 'k_role_employees';
	
	public $timestamps = true;
	
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'description', 'level', 
    ];
	
	/**
     * Relationship
     *
     */
	 
	 public function employee()
    {
        return $this->belongsTo('Employee');
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
