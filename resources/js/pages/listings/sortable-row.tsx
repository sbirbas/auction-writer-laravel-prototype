import { ListingDropdown } from '@/components/listing-dropdown';
import { TableCell, TableRow } from '@/components/ui/table';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripIcon } from 'lucide-react';

export default function SortableRow({
    item,
    selectedListings,
    toggleSelection,
}: {
    item: any;
    selectedListings: number[];
    toggleSelection: (listingId: number) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TableRow ref={setNodeRef} style={style}>
            <TableCell>
                <div {...attributes} {...listeners} className='cursor-grab p-2'>
                    <GripIcon />
                </div>
            </TableCell>
            <TableCell>
                <input type='checkbox' checked={selectedListings.includes(item.id)} onChange={() => toggleSelection(item.id)} />
            </TableCell>
            <TableCell className='text-center'>{item.id}</TableCell>
            <TableCell className='text-center'>{item.lot}</TableCell>
            <TableCell className='w-[auto] text-center sm:w-[150px] md:w-[200px]'>{item.title}</TableCell>
            <TableCell className='overflow-hidden text-center sm:w-[150px] md:w-[250px]'>{item.description}</TableCell>
            <TableCell className='text-center'>${item.estimate}</TableCell>
            <TableCell className='text-center'>{item.consignor}</TableCell>
            <TableCell className='text-center'>
                <ListingDropdown data={item} />
            </TableCell>
        </TableRow>
    );
}
