<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ListingsIndexController extends Controller
{
    //this is just for passing the listing model to all the views.
    protected function getUserListings()
    {
        $user = auth()->user();
        return [
            'user' => $user,
            'listings' => Listing::where('user_id', $user->id)->get()
        ];
    }

    public function index()
    {
        return Inertia::render('listings/index', $this->getUserListings());
    }

    public function create()
    {
        return Inertia::render('listings/create', $this->getUserListings());
    }

    public function edit()
    {
        return Inertia::render('listings/edit', $this->getUserListings());
    }
    public function duplicate()
    {
        return Inertia::render('listings/duplicate', $this->getUserListings());
    }

    public function delete()
    {
        return Inertia::render('listings/delete', $this->getUserListings());
    }
}
