<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return ["status" => "LKP Backend Active"];
});

// Helper routes for live server setup
Route::get('/setup-link', function () {
    Artisan::call('storage:link');
    return "Storage link created";
});

Route::get('/setup-migrate', function () {
    Artisan::call('migrate', ['--force' => true]);
    Artisan::call('db:seed', ['--force' => true]);
    return "Migration and Seeding completed";
});

Route::get('/setup-clear', function () {
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('cache:clear');
    return "Cache cleared";
});
