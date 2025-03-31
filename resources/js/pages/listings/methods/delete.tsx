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

export function DeleteListing({ data }) {
    const { delete: destroy } = useForm();
    const [isDeleting, setIsDeleting] = useState(false);

    function handleDelete() {
        console.log("Deleting listing:", data);

        if (!data || !data.id) {
            console.error("Listing ID is missing!");
            toast.error("Listing ID is missing!");
            return;
        }

        setIsDeleting(true);

        // Make the actual delete request
        destroy(`/listing/${data.id}`)
            .then(() => {
                // On success, show a toast message
                toast.success("Listing deleted successfully");
            })
            .catch((error) => {
                // On failure, revert the update and show an error message
                console.error("Error deleting listing:", error);
                setIsDeleting(false);
                toast.error("Failed to delete the listing. Please try again.");
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
