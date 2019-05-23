<?php

namespace App\Models;

use App\Classes\Summary;
use App\Imports\CustomersImport;
use App\Traits\CreatedBy;
use Illuminate\Database\Eloquent\Model;
use Maatwebsite\Excel\Facades\Excel;

class DataImport extends Model
{
    use CreatedBy;

    protected $extensions = ['xlsx'];

    protected $fillable = ['type', 'name', 'summary'];

    protected $casts = ['summary' => 'object'];

    public function getSuccessfulAttribute()
    {
        $import = self::find($this->id);

        return $import->summary->successful;
    }

    public function getIssuesAttribute()
    {
        $import = self::find($this->id);

        return collect($import->summary->contentIssues)
            ->count();
    }

    public function summary()
    {
        return json_encode($this->summary);
    }



    public function folder()
    {
        return config('klm.paths.imports');
    }

    public function isDeletable()
    {
        return true;
    }


}
