<?php

  namespace App\Models;

  // Equivalent du CoreModel de S5-S6
  use Illuminate\Database\Eloquent\Model;

  class Task extends Model
  {
    public function category()
    {
      // DOC : https://laravel.com/docs/8.x/eloquent-relationships#one-to-many-inverse
      return $this->belongsTo( Category::class );
    }
  }