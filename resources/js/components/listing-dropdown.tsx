import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteListing } from "@/pages/listings/delete";
import { EditListing } from "@/pages/listings/edit";
import { DuplicateListings } from "@/pages/listings/duplicate-multiple";

export function ListingDropdown({data}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Button>...</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}><EditListing listing={data} /></DropdownMenuItem>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}><DuplicateListings selectedListings={[data.id]}/></DropdownMenuItem>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}><DeleteListing data={data}/></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
