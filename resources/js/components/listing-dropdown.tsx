import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DeleteListing } from '@/pages/listings/methods/delete';
import { DuplicateListings } from '@/pages/listings/methods/duplicate-multiple';
import { EditListing } from '@/pages/listings/methods/edit';
import { Button } from './ui/button';

export function ListingDropdown({ data }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button>...</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <EditListing listing={data} />
                </DropdownMenuItem>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <DuplicateListings selectedListings={[data.id]} />
                </DropdownMenuItem>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <DeleteListing data={data} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
