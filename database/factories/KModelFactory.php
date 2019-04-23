<?php

use Faker\Generator as Faker;

$factory->define(App\Models\KModel::class, function (Faker $faker) {
    return [
		'name' => $faker->unique()->randomElement(['Sandrion', 'Black Panthère', 'Wakanda', 'AGADA Cintré', 'Chemise manche longue']),
		'sex_ref' => $faker->randomElement(['F','M']),
		'categorie_id' => $faker->unique()->numberBetween(1,20)
    ];
});
