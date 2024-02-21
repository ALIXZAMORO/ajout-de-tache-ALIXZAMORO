<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route de la récupération de toutes les taches
// Méthode HTTP : GET
// Chemin : http://localhost:8000/api/task/list
// Controller : TaskController
// Méthode : list()
Route::get( '/tasks', [
  TaskController::class, // FQCN du contrôleur à instancier
  'list'                 // Nom de la méthode ce contrôleur à executer
] )->name('task-list');

// Route de récupération de tache par ID
Route::get( '/tasks/{id}', [
  TaskController::class,
  'find'
] )->where( 'id', '[0-9]+' )->name( 'task-find' );

// Route d'ajout de tache
Route::post( '/tasks', [
  TaskController::class,
  'add'
] )->name( 'task-add' );

// Route de modification de tache
Route::put( '/tasks/{id}', [
  TaskController::class,
  'update'
] )->where( 'id', '[0-9]+' )->name( 'task-update' );

// Route de suppression
Route::delete( '/tasks/{id}', [
  TaskController::class,
  'delete'
] )->where( 'id', '[0-9]+' )->name( 'task-delete' );

