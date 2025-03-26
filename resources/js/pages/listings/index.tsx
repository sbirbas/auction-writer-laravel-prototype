import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import CreateListingModal from '@/components/create';
import { ListingDropdown } from '@/components/listing-dropdown';
import { usePage } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <h1> Welcome</h1>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <CreateListingModal></CreateListingModal>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        test                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left"></TableHead>
                                <TableHead className="text-left">Sale Order</TableHead>
                                <TableHead className="text-left">#</TableHead>
                                <TableHead className="text-left">Title</TableHead>
                                <TableHead className="text-left w-[200px]">Description</TableHead>
                                <TableHead className="text-left">Estimate</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {listings.map((listing) => (
                                <TableRow key={listing.id}>
                                    <TableCell className="text-left">{listing.sale_order}</TableCell>
                                    <TableCell className="text-left">{listing.id}</TableCell>
                                    <TableCell className="text-left">{listing.title}</TableCell>
                                    <TableCell className="text-left w-[200px] max-w-[200px] truncate">{listing.description}</TableCell>
                                    <TableCell className="text-left">${listing.estimate}</TableCell>
                                    <TableCell className="text-left"><ListingDropdown /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
