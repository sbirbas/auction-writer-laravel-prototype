import { router } from "@inertiajs/react";

interface DuplicateListingsProps {
    selectedListings: number[];
}

export function DuplicateListings({ selectedListings }: DuplicateListingsProps) {
    const duplicateSelected = () => {
        if (selectedListings.length === 0) {
            alert("Please select at least one listing to duplicate.");
            return;
        }

        router.post("/listing/duplicate-multiple", {
            listingIds: selectedListings,
        });
    };

    return (
        <button
            onClick={duplicateSelected}
            hidden={selectedListings.length === 0}
            className="mt-2 p-2 bg-grey-500 text-white rounded"
        >
            Duplicate
        </button>
    );
}
