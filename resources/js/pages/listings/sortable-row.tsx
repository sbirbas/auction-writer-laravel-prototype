import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableRow, TableCell } from "@/components/ui/table";
import { GripIcon } from "lucide-react";
import { ListingDropdown } from "@/components/listing-dropdown";
import { router } from '@inertiajs/react';

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
                <div {...attributes} {...listeners} className="cursor-grab p-2">
                    <GripIcon />
                </div>
            </TableCell>
            <TableCell>
                <input
                    type="checkbox"
                    checked={selectedListings.includes(item.id)}
                    onChange={() => toggleSelection(item.id)}
                />
            </TableCell>
            <TableCell className="text-center">{item.id}</TableCell>
            <TableCell className="text-center">{item.lot}</TableCell>
            <TableCell className="text-center w-[auto] sm:w-[150px] md:w-[200px]">{item.title}</TableCell>
            <TableCell className="text-center sm:w-[150px] md:w-[250px] overflow-hidden">{item.description}</TableCell>
            <TableCell className="text-center">${item.estimate}</TableCell>
            <TableCell className="text-center">{item.consignor}</TableCell>
            <TableCell className="text-center">
                <ListingDropdown data={item} />
            </TableCell>
        </TableRow>
    );
}
