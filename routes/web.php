<?php

use App\Http\Controllers\ListingController;
use App\Http\Controllers\ListingsIndexController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('listings', [ListingsIndexController::class, 'index'])->name('manage-listings');
    Route::resource('posts', ListingController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
