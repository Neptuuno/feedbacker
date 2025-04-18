import {CircleUser} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {fetchWrapper} from "@/lib/fetchwrapper";
import {User} from "@/lib/Entities/User";
import LogoutMenuItem from "@/components/LogoutMenuItem";

async function getUserData(): Promise<User> {
    const url = `${process.env.API_URL}/auth/profile`;
    return await fetchWrapper(url);
}

export default async function AccountMenu() {
    const userData = await getUserData();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5"/>
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{userData.username}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator/>
                <LogoutMenuItem/>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}