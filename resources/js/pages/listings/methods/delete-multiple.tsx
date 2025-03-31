import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useState } from "react";

interface DeleteListingsProps {
    selectedListings: number[];
    setSelectedListings: React.Dispatch<React.SetStateAction<number[]>>;
    setItems: React.Dispatch<React.SetStateAction<any[]>>; // Added this to update the items state
}

export function DeleteMultiple({ selectedListings, setSelectedListings, setItems }: DeleteListingsProps) {
    const [deleting, setDeleting] = useState(false); // Track if deletion is in progress
    const [deletingIds, setDeletingIds] = useState<number[]>([]); // Track the listings being deleted

    const deleteSelected = async () => {
        if (selectedListings.length === 0) {
            alert("Please select at least one listing to delete.");
            return;
        }

        // Optimistically update UI - remove listings being deleted
        setDeleting(true);
        setDeletingIds(selectedListings);
        setSelectedListings([]); // Optionally clear the selected listings

        // Remove the listings from `items` optimistically
        setItems((prevItems) => prevItems.filter((item) => !selectedListings.includes(item.id)));

        toast("Deleting listings...");

        try {
            await router.post("/listing/delete-multiple", {
                listingIds: selectedListings,
            });

            toast.success("Listings deleted successfully");
        } catch (error) {
            toast.error("Error deleting listings. Please try again.");
            // Revert the UI if it fails
            setDeleting(false);
            setDeletingIds([]);
            setSelectedListings(selectedListings); // Restore the selected listings

            // Restore the deleted items in case of failure
            setItems((prevItems) => [
                ...prevItems,
                ...selectedListings.map(id => ({ id })) // Assuming you have access to the full listings data
            ]);
        }
    };

    return (
        <button
            onClick={deleteSelected}
            disabled={selectedListings.length === 0} // Disable the button while deleting
            className="m-2 p-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
            Delete Selected
        </button>
    );
}
