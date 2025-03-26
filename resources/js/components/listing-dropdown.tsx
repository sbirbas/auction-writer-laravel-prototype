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



export function ListingDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Button>Actions</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}><EditListing></EditListing></DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}><DeleteListing></DeleteListing></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
