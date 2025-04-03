<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB as FacadesDB;

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

        $listing->updated_at = Carbon::now();

        $listing->update($validatedData);
    }

    public function duplicate(Request $request)
    {
        $listingIds = $request->input('listingIds', []);

        foreach ($listingIds as $id) {
            $originalListing = Listing::findOrFail($id);
            // duplicating with the eloquent replicate() method
            $newListing = $originalListing->replicate();
            $newListing->created_at = Carbon::now();
            // this is to prevent 2 rows from having the same position on duplication
            $newListing->position = Listing::max('position') + 1;

            $newListing->save();
        }
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|integer',
        ]);

        FacadesDB::transaction(function () use ($request) {
            foreach ($request->items as $index => $item) {
                Listing::where('id', $item['id'])->update(['position' => $index]);
            }
        });
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
        $listingIds = $request->input('listingIds');

        foreach ($listingIds as $id) {
            $selectedListing = Listing::findOrFail($id);
            $selectedListing->delete();
        }
    }
}
