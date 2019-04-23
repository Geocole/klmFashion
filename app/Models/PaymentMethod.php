<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaymentMethod extends Model {

    use SoftDeletes;

    protected $table = 'payment_methods';

    protected $dates = ['deleted_at'];


    protected $fillable = ['name', 'deadlines_by', 'deadlines',
        'payment_is_cash', 'auto_direct_debit', 'active','key'];

    public static $rules = array(
        'name'         => array('required', 'min:2', 'max:128'),
    );


    public function getDeadlinesAttribute($value)
    {
        return unserialize($value);
    }

    public function setDeadlinesAttribute($value)
    {
        $this->attributes['deadlines'] = serialize($value);
    }

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function customerinvoices()
    {
        return $this->hasMany('App\Models\Customerinvoice');
    }
}

