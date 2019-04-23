<?php

namespace App\Models;

use App\RoleEmployee;
use App\Task;
use App\Traits\AddressTrait;
use App\Traits\PersonTrait;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Webpatser\Uuid\Uuid;

class Employee extends Model{

    use AddressTrait, PersonTrait,Sluggable;


    protected $table= 'k_employees';


    protected $fillable= ['person_id','role_id'];


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


    public function role(){

        return $this->belongsTo(RoleEmployee::class,'role_id');
    }

    /**
     * Relationship
     *
     */
    public function tasks()
    {
        return $this->belongsToMany(Task::class,'k_tasks_employees','k_employee_id','k_task_id');
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
                'source' => ['person.name', 'person.lastname','role.name']
            ]
        ];
    }
}