<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Customer::class, function (Faker $faker) {
    return [
        'person_id'=>$faker->numberBetween(6,16),
        'currency_id' => $faker->numberBetween(9,12),
        'created_by' => $faker->numberBetween(1,2)
    ];
});
