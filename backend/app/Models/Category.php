<?php

  namespace App\Models;

  use Illuminate\Database\Eloquent\Model;

  class Category extends Model
  {
    // On indique a Eloquent que notre table n'a pas les colonnes created_at et updated_at
    // https://laravel.com/docs/8.x/eloquent#timestamps
    public $timestamps = false;

    public function tasks()
    {
      // DOC : https://laravel.com/docs/8.x/eloquent-relationships#one-to-many
      return $this->hasMany( Task::class );
    }
  }