import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useState } from "react";

interface DuplicateListingsProps {
    selectedListings: number[];
}

export function DuplicateListings({ selectedListings }: DuplicateListingsProps) {
    //For optimistic updates set the state to track
    const [duplicating, setDuplicating] = useState(false);

    const duplicateSelected = async () => {
        if (selectedListings.length === 0) {
            toast.error("Please select at least one listing to duplicate.");
            return;
        }

        setDuplicating(true);
        toast("Duplicating listings...");

        try {
            await router.post("/listing/duplicate-multiple", {
                listingIds: selectedListings,
            });

            toast.success("Successfully duplicated lots!");
        } catch (error) {
            toast.error("Error duplicating listings. Please try again.");
            //revert the UI if fails
            setDuplicating(false);
        }
    };

    return (
        <button
            onClick={duplicateSelected}
            hidden={selectedListings.length === 0}
            className="m-2 p-2 bg-red-500 text-white rounded"
        >
            Duplicate selected
        </button>
    );
}
