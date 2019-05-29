<?php
/**
 * Created by PhpStorm.
 * User: LGeoffroy
 * Date: 05/05/2019
 * Time: 11:37
 */

namespace App\Classes;


class Summary extends Obj
{
    public $file;
    public $sync_by;
    public $structureIssues;
    public $contentIssues;
    public $successful = 0;
    public $issues = 0;
    public $date;
    public $time;
    protected $syncName = "ClientsSyncs";

    public function __construct($file)
    {
        $this->file = $file;
        $this->structureIssues = new Obj();
        $this->contentIssues = new Obj();
        $this->date = now()->format(config('klm.phpDateFormat'));
        $this->time = now()->format('H:i');
        $this->sync_by = auth()->id();
    }

    public function rowsWithIssues()
    {
        if (! property_exists($this->contentIssues, $this->syncName)) {
            return collect();
        }

        return collect($this->contentIssues->$this->syncName)
            ->reduce(function ($rows, $category) {
                collect($category)->each(function ($issue) use ($rows) {
                    $rows->push($issue->rowNumber);
                });

                return $rows;
            }, collect())->unique();
    }

    public function addStructureIssue(string $category, string $value)
    {
        $container = $this->categoryContainer($this->structureIssues, $category);
        $container->push($value);

        $this->incIssues();
    }

    public function addContentIssue(string $category, int $rowNumber = null, string $column = null, $value = null)
    {
        $container = $this->categoryContainer($this->contentIssues, $category);

        $issue = new Obj(compact('rowNumber', 'column', 'value'));

        $container->push($issue);

        $this->incIssues();
    }

    public function incSuccess()
    {
        $this->successful++;
    }

    private function incIssues()
    {
        $this->issues++;
    }

    public function successful()
    {
        return $this->successful;
    }

    public function issues()
    {
        return $this->issues;
    }

    public function hasIssues()
    {
        return $this->issues > 0;
    }

    public function hasStructureIssues()
    {
        return collect($this->structureIssues)->isNotEmpty();
    }

    public function hasContentIssues()
    {
        return collect($this->contentIssues)->isNotEmpty();
    }

    private function categoryContainer(Obj $container, string $category)
    {
        if (! property_exists($container, $category)) {
            $container->set($category, collect());
        }

        return $container->$category;
    }

    private function sheetContainer(Obj $container)
    {
        if (! property_exists($container, $this->syncName)) {
            $container->set($this->syncName, new Obj());
        }
        $name = $this->syncName;

        return $container->$name;
    }
}