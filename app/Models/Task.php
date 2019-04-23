<?php

namespace App\Models;

use App\Models\Employee;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Webpatser\Uuid\Uuid;

class Task extends Model
{
    use Sluggable;
	protected $table = 'k_tasks';
	
	public $timestamps = true;
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'duration', 
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
	
	/**
     * Relationship
     *
     */ 
	  public function employees()
	{	
		return $this->belongsToMany(Employee::class,'k_tasks_employees','k_task_id','k_employee_id');
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
