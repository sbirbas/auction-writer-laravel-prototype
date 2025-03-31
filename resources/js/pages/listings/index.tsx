import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { CreateListing } from "./methods/create";
import { DuplicateListings } from "./methods/duplicate-multiple";
import { DeleteMultiple } from "./methods/delete-multiple";
import { router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import SortableRow from "./sortable-row";

export default function ListingIndex() {
    const { listings } = usePage().props;
    const estimatedTotal = listings.reduce((total, listing) => total + parseFloat(listing.estimate), 0);
    const recordCount = listings.length;

    const [selectedListings, setSelectedListings] = useState<number[]>([]);
    const [items, setItems] = useState(listings);

    const toggleSelectAll = () => {
        if (selectedListings.length === listings.length) {
            setSelectedListings([]);
        } else {
            setSelectedListings(listings.map((listing) => listing.id));
        }
    };
    const toggleSelection = (listingId: number) => {
        setSelectedListings((prevSelected) =>
            prevSelected.includes(listingId)
                ? prevSelected.filter((id) => id !== listingId)
                : [...prevSelected, listingId]
        );
    };

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return;

        const newItems = arrayMove([...items], oldIndex, newIndex);
        setItems(newItems);

        const reorderedItems = newItems.map((item, index) => ({
            id: item.id,
            position: index,
        }));
        router.post("/listing/reorder", { items: newItems })
            .then(response => {
                console.log(response); // Check the response
            })
            .catch((error) => {
                console.error("Reorder failed", error);
                // If a redirect is happening, check the URL in error
            });

    };

    return (
        <AppLayout breadcrumbs={[{ title: "Listings", href: "/listings" }]}>
            <Head title="Dashboard" />
            <h1>Welcome</h1>

            <div className="flex flex-col gap-4 p-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border">
                        <h2 className="text-xl font-semibold">Total Lots: {recordCount}</h2>
                        <h2 className="text-xl font-semibold mt-2">Total Estimated Value: ${estimatedTotal}</h2>
                        <div className="mt-4">
                            <CreateListing />
                            <DeleteMultiple
                                selectedListings={selectedListings}
                                setSelectedListings={setSelectedListings}
                                setItems={setItems}
                            />
                            <DuplicateListings
                                selectedListings={selectedListings}
                                setSelectedListings={setSelectedListings}
                                setItems={setItems}
                            />
                        </div>
                    </div>
                </div>

                <div className="border rounded-xl overflow-hidden">
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                            <Table className="max-w-[1000px] w-full mx-auto">
                                <TableCaption>A list of your recent listings.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead></TableHead>
                                        <TableHead>
                                            <input
                                                type="checkbox"
                                                checked={selectedListings.length === listings.length}
                                                onChange={toggleSelectAll}
                                            />
                                        </TableHead>
                                        <TableHead className="text-center">Sale Order</TableHead>
                                        <TableHead className="text-center">Lot #</TableHead>
                                        <TableHead className="text-center w-[auto] sm:w-[150px] md:w-[200px]">Title</TableHead>
                                        <TableHead className="text-center w-[auto] sm:w-[150px] md:w-[250px]">Description</TableHead>
                                        <TableHead className="text-center">Estimate</TableHead>
                                        <TableHead className="text-center">Consignor</TableHead>
                                        <TableHead className="text-center">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.map((listing) => (
                                        <SortableRow
                                            key={listing.id}
                                            item={listing}
                                            selectedListings={selectedListings}
                                            toggleSelection={toggleSelection}
                                            setItems={setItems}
                                        />
                                    ))}
                                </TableBody>
                            </Table>

                        </SortableContext>
                    </DndContext>
                </div>
            </div>
        </AppLayout>
    );
}
