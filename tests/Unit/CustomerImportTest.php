<?php

namespace Tests\Unit;

use App\Imports\CustomersImport;
use League\Flysystem\FileNotFoundException;
use Maatwebsite\Excel\Facades\Excel;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CustomerImportTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testExample()
    {

        Excel::fake();

        $this->actingAs($this->givenUser())
            ->get('/users/queue/xlsx');


        Excel::assertQueued('filename.xlsx', 'diskName');

        Excel::assertQueued('filename.xlsx', 'diskName', function(CustomersImport $import) {
            return true;
        });


    }
}
