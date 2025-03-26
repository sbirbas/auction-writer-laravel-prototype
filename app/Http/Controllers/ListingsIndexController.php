<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ListingsIndexController extends Controller
{
    public function index()
    {
        $listings = Listing::all();

        return Inertia::render('listings/index', ['listings' => $listings]);
    }
}
