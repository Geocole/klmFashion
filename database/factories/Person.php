<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Person::class, function (Faker $faker) {
    return [
        'gender' => $faker->randomElement(['H','F']),
        'name'=> $faker->name,
        'lastname'=> $faker->lastName,
        'birthday'=>$faker->dateTimeInInterval('-30years','-15years'),
    ];
});
