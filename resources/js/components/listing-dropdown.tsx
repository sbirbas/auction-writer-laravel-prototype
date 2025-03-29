import { Button } from "./ui/button";
import { router } from "@inertiajs/react";

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

export function ListingDropdown({data}) {


    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Button>...</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}><EditListing></EditListing></DropdownMenuItem>
                <DropdownMenuItem>
                    Duplicate Listing
                </DropdownMenuItem>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}><DeleteListing data={data}/></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
