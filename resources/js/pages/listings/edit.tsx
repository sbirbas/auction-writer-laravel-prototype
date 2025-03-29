import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EditListing() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Listing</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Listing</DialogTitle>
                    <DialogDescription>
                        Make changes to your listing. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
