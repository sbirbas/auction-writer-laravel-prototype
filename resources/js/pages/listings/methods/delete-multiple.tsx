import { router } from "@inertiajs/react";

interface DeleteListingsProps {
    selectedListings: number[];
}

export function DeleteMultiple({ selectedListings }: DeleteListingsProps) {
    const deleteSelected = () => {
        if (selectedListings.length === 0) {
            alert("Please select at least one listing to delete.");
            return;
        }

        router.post("/listing/delete-multiple", {
            listingIds: selectedListings,
        });

    };

    return (
        <button
            onClick={deleteSelected}
            disabled={selectedListings.length === 0}
            className="mt-2 p-2 bg-red-500 text-white rounded"
        >
            Delete Selected
        </button>
    );
}
