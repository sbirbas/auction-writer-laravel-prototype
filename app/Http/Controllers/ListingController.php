<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Listing;

class ListingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'user_id' => auth()->id(),
            'estimate' => 'required|integer',
            'sale_order' => 'required|string',
        ]);
    }
    public function update()
    {

    }
    public function destroy()
    {
        Listing::delete([

        ]);
    }
}
