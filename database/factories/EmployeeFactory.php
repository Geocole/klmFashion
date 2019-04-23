<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Employee::class, function (Faker $faker) {
    return [
        'person_id'=>$faker->unique()->numberBetween(4,30),
        'role_id' => 3
    ];
});
