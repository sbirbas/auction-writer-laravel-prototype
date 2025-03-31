import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useState } from "react";

interface DuplicateListingsProps {
    selectedListings: number[];
    setSelectedListings: React.Dispatch<React.SetStateAction<number[]>>;
}

export function DuplicateListings({ selectedListings, setSelectedListings }: DuplicateListingsProps) {
    // For optimistic updates, set the state to track duplicating listings
    const [duplicating, setDuplicating] = useState(false);
    const [duplicatingIds, setDuplicatingIds] = useState<number[]>([]); // Track the listings being duplicated

    const duplicateSelected = async () => {
        if (selectedListings.length === 0) {
            toast.error("Please select at least one listing to duplicate.");
            return;
        }

        // Optimistically update UI - remove listings being duplicated
        setDuplicating(true);
        setDuplicatingIds(selectedListings);
        setSelectedListings([]);
        toast("Duplicating listings...");

        try {
            await router.post("/listing/duplicate-multiple", {
                listingIds: selectedListings,
            });

            toast.success("Successfully duplicated lots!");
        } catch (error) {
            toast.error("Error duplicating listings. Please try again.");
            // Revert the UI if it fails
            setDuplicating(false);
            setDuplicatingIds([]);
            setSelectedListings(selectedListings);
        }
    };

    return (
        <button
            onClick={duplicateSelected}
            disabled={selectedListings.length === 0}
            className="m-2 p-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
            Duplicate
        </button>
    );
}
