<?php

use App\RoleEmployee;
use Illuminate\Database\Seeder;

class RoleTableSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RoleEmployee::create([
            'name' => 'Admin',
            'description' => str_random(50),
            'level' => 5,
        ]);

        RoleEmployee::create([
            'name' => 'Staff',
            'description' => str_random(50),
            'level' => 3,
        ]);

        RoleEmployee::create([
            'name' => 'Taylor',
            'description' => str_random(50),
            'level' => 1,
        ]);
    }
}
