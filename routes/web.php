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
    Route::prefix('listings')->name('listings.')->group(function () {
        Route::get('/', [ListingsIndexController::class, 'index'])->name('index');
        Route::get('/create', [ListingsIndexController::class, 'create']);
        Route::get('/{listing}/edit', [ListingsIndexController::class, 'edit']);
        Route::get('/delete', [ListingsIndexController::class, 'delete']);
    });
});

// CRUD Actions for Listings
Route::resource('listing', ListingController::class)->only(['store', 'update', 'destroy']);

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
