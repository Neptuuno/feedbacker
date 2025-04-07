import Link from "next/link";
import {MessageSquareDiff, NotepadText, PanelsTopLeft} from "lucide-react";
import {NavLink} from "@/components/navigation/NavLink";

export default function Sidebar() {

    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <MessageSquareDiff className="h-6 w-6"/>
                        <span className="">Feedbacker</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
                </div>
            </div>
        </div>
    )
}