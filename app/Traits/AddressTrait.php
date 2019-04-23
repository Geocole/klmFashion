<?php

namespace App\Traits;

trait AddressTrait {

    public function addresses()
    {
        return $this->morphMany('App\Models\Address', 'addressable');
    }

}