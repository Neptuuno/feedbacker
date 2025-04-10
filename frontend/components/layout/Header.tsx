
import Link from "next/link";
import {Menu, MessageSquareDiff, NotepadText, PanelsTopLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
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
                            <SheetTitle>Feedbacker</SheetTitle>
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
            </div>
        <AccountMenu/>
        </header>
    )
}