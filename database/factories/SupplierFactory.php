<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Supplier::class, function (Faker $faker) {
    return [
		'person_id' => $faker->unique()->numberBetween(1,15),
		'currency_id' => $faker->unique()->numberBetween(3,27),
		'language_id' => $faker->unique()->numberBetween(7,19),
		'reference' => $faker->unique()->numberBetween(17,33),
		'barcode_symbol' => $faker->unique()->word,
		'status' => $faker->numberBetween(0, 1)
    ];
});
