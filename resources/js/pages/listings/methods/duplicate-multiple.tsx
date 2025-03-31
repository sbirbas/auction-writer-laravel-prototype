import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useState } from "react";

interface DuplicateListingsProps {
    selectedListings: number[];
}

export function DuplicateListings({ selectedListings }: DuplicateListingsProps) {
    // For optimistic updates, set the state to track duplicating listings
    const [duplicating, setDuplicating] = useState(false);
    const [duplicatingIds, setDuplicatingIds] = useState<number[]>([]); // Track the listings being duplicated

    const duplicateSelected = async () => {
        if (selectedListings.length === 0) {
            toast.error("Please select at least one listing to duplicate.");
            return;
        }

        setDuplicating(true);
        setDuplicatingIds(selectedListings);

        toast("Duplicating listings...");

        try {
            await router.post("/listing/duplicate-multiple", {
                listingIds: selectedListings,
            });

            toast.success("Successfully duplicated lots!"); p
        } catch (error) {
            toast.error("Error duplicating listings. Please try again.");
            // Revert the UI if it fails
            setDuplicating(false);
            setDuplicatingIds([]);
        }
    };

    return (
        <button
            onClick={duplicateSelected}
            hidden={selectedListings.length === 0} // Disable the button while duplicating
            className="m-2 p-2 bg-red-500 text-white rounded"
        >
            Duplicate
        </button>
    );
}
