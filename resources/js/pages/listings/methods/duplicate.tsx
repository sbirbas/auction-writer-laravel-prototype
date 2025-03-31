import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DuplicateListingsProps {
    selectedListings: number[];
}

export function DuplicateListing({ selectedListings }: DuplicateListingsProps) {
    const [duplicating, setDuplicating] = useState(false);

    const duplicateSelected = async () => {
        if (selectedListings.length === 0) {
            // This shouldn't happen since the button is disabled but it's anothercheck
            toast("Please select at least one listing to duplicate.");
            return;
        }

        setDuplicating(true);
        toast("Duplicating listings...");

        try {
            await router.post("/listing/duplicate-multiple", {
                listingIds: selectedListings,
            });

            toast("Listings duplicated successfully!");
        } catch (error) {
            toast.error("Error duplicating listings.");
            setDuplicating(false);
        }
    };

    return (
        <Button
            variant="outline"
            onClick={duplicateSelected}
            hidden={selectedListings.length === 0}
            className="text-sm sm:text-base"
            disabled={duplicating}
        >
            {duplicating ? "Duplicating..." : "Create Listing"}
        </Button>
    );
}
