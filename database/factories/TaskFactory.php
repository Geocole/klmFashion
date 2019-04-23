<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Task::class, function (Faker $faker) {
    return [
        //
		'name' => $faker->unique()->randomElement(['Couper Tissu', 'Brodeur', 'Repasseur', 'Mesureur', 'Assemblage']),
		'duration' => $faker->numberBetween(1,20)
    ];
});
