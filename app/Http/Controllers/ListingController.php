<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Listing;

class ListingController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'estimate' => 'required|integer',
            'sale_order' => 'required|integer',
        ]);

        $validatedData['user_id'] = auth()->id();

        Listing::create($validatedData);
    }
    public function update(Request $request, Listing $listing)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'estimate' => 'required|integer',
            'sale_order' => 'required|integer',
        ]);

        $listing->update($validatedData);
    }

    public function destroy(Listing $listing)
    {
        if (auth()->id() !== $listing->user_id) {
            return back()->with('error', 'Unauthorized action!');
        }

        $listing->delete();
    }
}
