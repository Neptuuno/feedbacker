"use client";

import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {logout} from "@/app/(auth)/actions";

export default function LogoutMenuItem() {
    return (
        <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
    );
}