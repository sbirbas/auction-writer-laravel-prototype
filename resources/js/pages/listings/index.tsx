import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { CreateListing } from './methods/create';
import { DeleteMultiple } from './methods/delete-multiple';
import { DuplicateListings } from './methods/duplicate-multiple';
import SortableRow from './sortable-row';

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
            prevSelected.includes(listingId) ? prevSelected.filter((id) => id !== listingId) : [...prevSelected, listingId],
        );
    };

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        //checks if the target is different from the dragged item, and find the new indices
        //and if they are valid, moves item
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return;

        const newItems = arrayMove([...items], oldIndex, newIndex);
        setItems(newItems);

        const reorderedItems = newItems.map((item, index) => ({
            id: item.id,
            position: index,
        }));
        router.post('/listing/reorder', { items: newItems }).then((response) => {
            console.log(response);
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Listings', href: '/listings' }]}>
            <Head title='Dashboard' />
            <div className='flex flex-col gap-4 p-4'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                    <div className='rounded-xl border bg-white p-6 shadow-lg dark:bg-gray-800'>
                        <h2 className='text-xl font-semibold'>Total Lots: {recordCount}</h2>
                        <h2 className='mt-2 text-xl font-semibold'>Total Estimated Value: ${estimatedTotal}</h2>
                        <div className='mt-4'>
                            <CreateListing />
                            <DeleteMultiple selectedListings={selectedListings} setSelectedListings={setSelectedListings} setItems={setItems} />
                            <DuplicateListings selectedListings={selectedListings} setItems={setItems} />
                        </div>
                    </div>
                </div>

                <div className='overflow-hidden rounded-xl border'>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                            <Table className='mx-auto w-full max-w-[1000px]'>
                                <TableCaption>A list of your recent listings.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead></TableHead>
                                        <TableHead>
                                            <input type='checkbox' checked={selectedListings.length === listings.length} onChange={toggleSelectAll} />
                                        </TableHead>
                                        <TableHead className='text-center'>Sale Order</TableHead>
                                        <TableHead className='text-center'>Lot #</TableHead>
                                        <TableHead className='w-[auto] text-center sm:w-[150px] md:w-[200px]'>Title</TableHead>
                                        <TableHead className='w-[auto] text-center sm:w-[150px] md:w-[250px]'>Description</TableHead>
                                        <TableHead className='text-center'>Estimate</TableHead>
                                        <TableHead className='text-center'>Consignor</TableHead>
                                        <TableHead className='text-center'>Actions</TableHead>
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
