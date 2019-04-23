<?php

use Illuminate\Database\Seeder;

class MaterialTableSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Material::class,25)->create();
    }
}
