<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/user/csrf', function (Request $request) {
    $token = \App\Models\User::first()->createToken($request->input('token_name'));
    return ['token' => $token->plainTextToken];
});

// Get client
Route::middleware('auth:sanctum')->post('/client', App\Http\Controllers\Api\GetClientController::class);

// Get all client
Route::middleware('auth:sanctum')->get('/clients', App\Http\Controllers\Api\GetAllClientController::class);

// Get one client
Route::middleware('auth:sanctum')->get('/client/{client}', App\Http\Controllers\Api\GetOneClientController::class);

// Create client
Route::middleware('auth:sanctum')->post('/client/create', App\Http\Controllers\Api\CreateClientController::class);

// Update client
Route::middleware('auth:sanctum')->post('/client/{client}', App\Http\Controllers\Api\UpdateClientController::class);

// Get project
Route::middleware('auth:sanctum')->post('/project', App\Http\Controllers\Api\GetProjectController::class);

// Get one project
Route::middleware('auth:sanctum')->get('/project/{project}', App\Http\Controllers\Api\GetOneProjectController::class);

// Create project
Route::middleware('auth:sanctum')->post('/project/create', App\Http\Controllers\Api\CreateProjectController::class);

// Delete project
Route::middleware('auth:sanctum')->post('/project/delete', App\Http\Controllers\Api\DeleteProjectController::class);

// Update project
Route::middleware('auth:sanctum')->post('/project/{project}', App\Http\Controllers\Api\UpdateProjectController::class);