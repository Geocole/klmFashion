<?php

namespace App\Models;

use App\Traits\CreatedBy;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\File;

class DataImport extends Model implements HasMedia
{
    use CreatedBy, HasMediaTrait;

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

    public function registerMediaCollections()
    {
        $this->addMediaCollection('customers-imports')
            ->acceptsFile(function (File $file) {
            return collect([
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel,text/csv'
            ])->contains($file->mimeType);
        });
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
