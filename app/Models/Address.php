<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property mixed phone_regular
 * @property mixed address1
 * @property mixed address2
 * @property mixed postcode
 * @property mixed country_id
 * @property mixed city_id
 * @property mixed email
 */
class Address extends Model {

    use SoftDeletes;

    protected $dates = ['deleted_at'];
    
    protected $fillable = [ 'alias',
    'address1', 'address2', 'postcode', 'city', 'state_id', 'country_id', 
    'city_id','name', 'email','phone_regular', 'phone_mobile', 'fax'
    ,'notes', 'active','latitude', 'longitude','addressable_id','addressable_type'
    ];

    public static $rules = array(
        'alias'    => 'required|min:2|max:32',
        'address1' => 'required|min:2|max:128',
        );

    public static function related_rules($rel = 'address')
    {
        // https://laracasts.com/discuss/channels/requests/laravel-5-validation-request-how-to-handle-validation-on-update/?page=1
        $rules = array();
        
        foreach ( self::$rules as $key => $rule) 
        {
            $rules[ $rel.'.'.$key ] = $rule;
        }
        return $rules;
    }


    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function customer()
    {
        return $this->belongsTo('App\Customer', 'owner_id')->where('model_name', '=', 'Customer');
    }
    
    public function addressable()
    {
        return $this->morphTo();
    }

    public function country()
    {
        return $this->belongsTo('App\Models\Country','id','country_id');
    }

    public function state()
    {
        return $this->belongsTo('App\Models\State','id','state_id');
    }


    
}