<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TasksEmployee extends Model
{
    //
	public $timestamps = true;
	
	protected $table = 'k_tasks_employees';
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'level', 
    ];
	
	/**
     * Relationship
     *
     */
}
