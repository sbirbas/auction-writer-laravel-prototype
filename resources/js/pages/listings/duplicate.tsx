import { router } from "@inertiajs/react";

interface DuplicateListingsProps {
    selectedListings: number[];
}

export function DuplicateListing({ data }: DuplicateListingsProps) {
    const duplicateSelected = () => {
        if (selectedListings.length === 0) {
            alert("Please select at least one listing to duplicate.");
            return;
        }

        router.post("/listing/duplicate-multiple", {
            listingIds: data.id,
        });
    };

    return (
        <button
            onClick={duplicateSelected}
            hidden={selectedListings.length === 0}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
            Duplicate Selected
        </button>
    );
}
