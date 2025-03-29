import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ListingDropdown } from '@/components/listing-dropdown';
import { usePage } from '@inertiajs/react';
import { CreateListing } from './create';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Checkbox } from "@/components/ui/checkbox"
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Listings',
        href: '/listings',
    },
];

interface listing {
    id: number;
    title: string;
    user_id: number;
    description: string;
    estimate: number;
    sale_order: number;
}

export default function ListingIndex({ }) {
    const { listings } = usePage().props;
    const estimatedTotal = listings.reduce((totalValue, listing) => totalValue + parseFloat(listing.estimate), 0);
    const recordCount = listings.length;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <h1> Welcome</h1>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="max-h-[150px] p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Total Lots: {recordCount}</h2>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-2">Total Estimated Value: ${estimatedTotal}</h2>
                        <div className="mt-4">
                            <CreateListing />
                        </div>
                    </div>
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableCell className=""><Checkbox
                                ></Checkbox></TableCell>
                                <TableHead className="text-center">Sale Order</TableHead>
                                <TableHead className="text-center">#</TableHead>
                                <TableHead className="text-center">Title</TableHead>
                                <TableHead className="text-center w-[200px]">Description</TableHead>
                                <TableHead className="text-center">Estimate</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {listings.map((listing) => (
                                <TableRow key={listing.id}>
                                    <TableCell className=""><Checkbox></Checkbox></TableCell>
                                    <TableCell className="text-center">{listing.sale_order}</TableCell>
                                    <TableCell className="text-center">{listing.id}</TableCell>
                                    <TableCell className="text-center">{listing.title}</TableCell>
                                    <TableCell className="text-center w-[200px] max-w-[200px] truncate">{listing.description}</TableCell>
                                    <TableCell className="text-center">${listing.estimate}</TableCell>
                                    <TableCell className="text-center"><ListingDropdown data={listing}></ListingDropdown></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
