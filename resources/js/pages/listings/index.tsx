import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { CreateListing } from "./create";
import { DeleteListing } from "./delete";
import { DuplicateListings } from "./duplicate-multiple";
import { DeleteMultiple } from "./delete-multiple";
import { Button } from "@/components/ui/button";
import { ListingDropdown } from "@/components/listing-dropdown";
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

export default function ListingIndex() {
    const { listings } = usePage().props;
    const estimatedTotal = listings.reduce((total, listing) => total + parseFloat(listing.estimate), 0);
    const recordCount = listings.length;

    const [selectedListings, setSelectedListings] = useState<number[]>([]);

    const toggleSelection = (listingId: number) => {
        setSelectedListings((prevSelected) =>
            prevSelected.includes(listingId)
                ? prevSelected.filter((id) => id !== listingId)
                : [...prevSelected, listingId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedListings.length === listings.length) {
            setSelectedListings([]);
        } else {
            setSelectedListings(listings.map((listing) => listing.id));
        }
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
                            <DeleteMultiple selectedListings={selectedListings} />
                            <DuplicateListings selectedListings={selectedListings} />
                        </div>
                    </div>
                </div>

                <div className="border rounded-xl overflow-hidden">
                    <Table>
                        <TableCaption>A list of your recent listings.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        checked={selectedListings.length === listings.length}
                                        onChange={toggleSelectAll}
                                    />
                                </TableCell>
                                <TableHead className="text-center">Sale Order</TableHead>
                                <TableHead className="text-center">Lot #</TableHead>
                                <TableHead className="text-center w-[200px]">Title</TableHead>
                                <TableHead className="text-center w-[200px]">Description</TableHead>
                                <TableHead className="text-center">Estimate</TableHead>
                                <TableHead className="text-center">Consignor</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {listings.map((listing) => (
                                <TableRow key={listing.id}>
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            checked={selectedListings.includes(listing.id)}
                                            onChange={() => toggleSelection(listing.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="text-center">{listing.id}</TableCell>
                                    <TableCell className="text-center">{listing.lot}</TableCell>
                                    <TableCell className="text-center w-[200px] truncate">{listing.title}</TableCell>
                                    <TableCell className="text-center w-[200px] truncate">{listing.description}</TableCell>
                                    <TableCell className="text-center">${listing.estimate}</TableCell>
                                    <TableCell className="text-center">{listing.consignor}</TableCell>
                                    <TableCell className="text-center">
                                    <ListingDropdown data={listing} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
