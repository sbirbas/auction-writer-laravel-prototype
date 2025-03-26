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
            'sale_order' => 'required|string|max:255',
        ]);

        $validatedData['user_id'] = auth()->id();

        Listing::create($validatedData);

        return to_route('listings.index')->with('success', 'Listing created successfully!');
    }

    public function update(Request $request, Listing $listing)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'estimate' => 'required|integer',
            'sale_order' => 'required|string|max:255',
        ]);

        $listing->update($validatedData);

        return to_route('listings.index')->with('success', 'Listing updated successfully!');
    }

    public function destroy(Listing $listing)
    {
        if (auth()->id() !== $listing->user_id) {
            return back()->with('error', 'Unauthorized action!');
        }

        $listing->delete();

        return to_route('listings.index')->with('success', 'Listing deleted successfully!');
    }
}
