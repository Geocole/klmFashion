<?php

use Illuminate\Database\Seeder;

class EmployeeTableSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * Admin 1
         */
        \App\Models\Employee::create([
            'person_id'=>1,
            'role_id' =>1
        ]);

        /*
         * Admin 2
         */
        \App\Models\Employee::create([
            'person_id'=>2,
            'role_id' =>1
        ]);

        /*
         * Staff member
         */

        \App\Models\Employee::create([
            'person_id'=>3,
            'role_id' =>2
        ]);

        /*
         * 10 Taylors
         */

        factory(App\Models\Employee::class,10)->create();
    }
}
