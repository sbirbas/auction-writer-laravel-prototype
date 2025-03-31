import { useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DeleteListing({ data, onDelete }) {
    const { delete: destroy } = useForm();
    const [isDeleting, setIsDeleting] = useState(false);

    function handleDelete() {
        console.log("Deleting listing:", data);
        if (!data || !data.id) {
            console.error("Listing ID is missing!");
            return;
        }

        // Optimistic UI update: update the state before the request completes
        setIsDeleting(true);

        // Optimistically remove the listing from the list (or adjust UI state)
        if (onDelete) {
            onDelete(data.id); // Assume `onDelete` will remove the listing from the list in the parent component
        }

        // Make the actual delete request
        destroy(`/listing/${data.id}`)
            .then(() => {
                // On success, show a toast message
                toast.success("Listing deleted successfully");
            })
            .catch((error) => {
                // On failure, revert the optimistic update and show an error message
                setIsDeleting(false);
                toast.error("Failed to delete the listing. Please try again.");
                if (onDelete) {
                    onDelete(data.id, true); // Revert removal of the listing if deletion failed
                }
            });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isDeleting}>
                    Delete Lot
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your listing.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
