import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Accordion } from '@radix-ui/react-accordion';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
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

export default function ListingIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
            <Link href= {route('listings.create')}>


                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
test2
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
test                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>Manage Catalog</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Column1</TableHead>
                                <TableHead>Column2</TableHead>
                                <TableHead>Column3</TableHead>
                                <TableHead>Column4</TableHead>
                                <TableHead>Column5</TableHead>


                            </TableRow>
                        </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>cell</TableCell>
                            <TableCell>hi</TableCell>
                            <TableCell>hi</TableCell>
                            <TableCell>hi</TableCell>
                            <TableCell>hi</TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
