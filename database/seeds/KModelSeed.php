<?php

use Illuminate\Database\Seeder;

class KModelSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
		factory(App\Models\KModel::class,5)->create();
    }
}
