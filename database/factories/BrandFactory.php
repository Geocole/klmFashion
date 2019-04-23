<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Brand::class, function (Faker $faker) {
    return [
        'code'=>$faker->unique()->word,
        'name'=> $faker->unique()->word
    ];
});
