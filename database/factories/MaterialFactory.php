<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Material::class, function (Faker $faker) {
    return [
        'name'=>$faker->randomElement(['Boutton','Tissu','Basin','Perle','Lessi','Nilon']),
        'brand_id' => $faker->numberBetween(1,25),
        'last_purchase_cost'=>$faker->randomFloat(2,5000,35000),
        'purchase_cost'=>$faker->randomFloat(2,5000,35000),
        'categorie_id'=>$faker->numberBetween(1,10),
        'unit'=>$faker->randomElement(['m','yard']),
        'material_code'=>$faker->unique()->slug(1),
        'stock_quantity'=>$faker->numberBetween(20,50),
        'alert_quantity'=>$faker->numberBetween(5,10)
    ];
});
