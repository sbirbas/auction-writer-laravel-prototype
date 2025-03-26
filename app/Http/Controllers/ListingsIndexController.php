<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ListingsIndexController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $listings = Listing::where('user_id', $user->id)->get();
        
        return Inertia::render('listings/index', ['listings' => $listings, 'user' => $user]);
    }
}
