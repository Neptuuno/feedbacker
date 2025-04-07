
import Link from "next/link";
import {Home, Menu, MessageSquareDiff, NotepadText, PanelsTopLeft, Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Input} from "@/components/ui/input";
import AccountMenu from "@/components/AccountMenu";
import {NavLink} from "@/components/navigation/NavLink";

export default function Header() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5"/>
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <MessageSquareDiff className="h-6 w-6"/>
                            <span className="sr-only">Feedbacker</span>
                        </Link>
                        <NavLink
                            href={"/projects"}
                            name={"Projects"}
                            icon={<PanelsTopLeft className="h-5 w-5"/>}
                        />
                        <NavLink
                            href={"/forms"}
                            name={"Forms"}
                            icon={<NotepadText className="h-5 w-5"/>}
                        />
                    </nav>
                    <div className="mt-auto">
                    </div>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                        />
                    </div>
                </form>
            </div>
        <AccountMenu/>
        </header>
    )
}