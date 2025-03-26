import { Copy } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function CreateListingModal({ listing }) {
    const { data, setData, errors, put, reset, processing } = useForm({
        title: listing.title,
        description: listing.description,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(route('listing.update', listing.id), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Listing</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Listing</DialogTitle>
                    <DialogDescription>Modify the listing details.</DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="grid gap-4">
                    <label className="font-medium">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    {errors.title && <div className="text-red-500">{errors.title}</div>}

                    <label className="font-medium">Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    {errors.description && <div className="text-red-500">{errors.description}</div>}

                    <label className="font-medium">Estimate</label>
                    <input
                        type="number"
                        value={data.estimate}
                        onChange={(e) => setData("estimate", e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    {errors.estimate && <div className="text-red-500">{errors.estimate}</div>}

                    <label className="font-medium">Sale Order</label>
                    <input
                        type="text"
                        value={data.sale_order}
                        onChange={(e) => setData("sale_order", e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    {errors.sale_order && <div className="text-red-500">{errors.sale_order}</div>}



                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            {processing ? "Updating..." : "Update Listing"}
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
