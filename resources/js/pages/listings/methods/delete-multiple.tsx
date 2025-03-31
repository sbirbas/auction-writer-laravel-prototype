import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useState } from "react";

interface DeleteListingsProps {
    selectedListings: number[];
    setSelectedListings: React.Dispatch<React.SetStateAction<number[]>>;
    setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export function DeleteMultiple({ selectedListings, setSelectedListings, setItems }: DeleteListingsProps) {
    const [deleting, setDeleting] = useState(false);
    const [deletingIds, setDeletingIds] = useState<number[]>([]);

    const deleteSelected = async () => {
        if (selectedListings.length === 0) {
            alert("Please select at least one listing to delete.");
            return;
        }

        setDeleting(true);
        setDeletingIds(selectedListings);
        setSelectedListings([]);

        setItems((prevItems) => prevItems.filter((item) => !selectedListings.includes(item.id)));

        toast("Deleting listings...");

        try {
            await router.post("/listing/delete-multiple", {
                listingIds: selectedListings,
            });

            toast.success("Listings deleted successfully");
        } catch (error) {
            toast.error("Error deleting listings. Please try again.");
            setDeleting(false);
            setDeletingIds([]);
            setSelectedListings(selectedListings);

            setItems((prevItems) => [
                ...prevItems,
                ...selectedListings.map(id => ({ id }))
            ]);
        }
    };

    return (
        <button
            onClick={deleteSelected}
            disabled={selectedListings.length === 0}
            className="m-2 p-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
            Delete Selected
        </button>
    );
}
