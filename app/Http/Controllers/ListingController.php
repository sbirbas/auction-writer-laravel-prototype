<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Listing;
use Carbon\Carbon;

class ListingController extends Controller
{

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'lot' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'estimate' => 'required|integer',
            'consignor' => 'required|integer',
        ]);

        $validatedData['user_id'] = auth()->id();

        Listing::create($validatedData);
    }

    public function update(Request $request, Listing $listing)
    {
        $validatedData = $request->validate([
            'lot' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'estimate' => 'required|integer',
            'consignor' => 'required|integer',
        ]);

        $listing->update($validatedData);
    }

    public function duplicate($id)
    {
        $originalListing = Listing::findOrFail($id);

        $newListing = $originalListing->replicate();
        $newListing->created_at = Carbon::now();
        $newListing->save();
    }

    public function duplicateMultiple(Request $request)
    {
        $listingIds = $request->input('listingIds', []);

        foreach ($listingIds as $id) {
            $originalListing = Listing::findOrFail($id);

            $newListing = $originalListing->replicate();
            $newListing->created_at = Carbon::now();

            $newListing->save();
        }
    }


    public function reorder(Request $request)
    {
        foreach ($request->listings as $index => $listing) {
            Listing::where('id', $listing['id'])->update(['sort_order' => $index + 1]);
        }
    }

    public function destroy(Listing $listing)
    {
        if (auth()->id() !== $listing->user_id) {
            return back()->with('error', 'Unauthorized action!');
        }

        $listing->delete();
    }

    public function deleteMultiple(Request $request)
    {
        $listingIds = $request->input('listingIds', []);

        foreach ($listingIds as $id) {
            $id->delete();
        }
    }
}
