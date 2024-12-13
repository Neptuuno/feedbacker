"use client"

import Link from "next/link";
import {Bell, Home, MessageSquareDiff, PanelsTopLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";

export default function Sidebar() {
    const currentPath = usePathname();

    return (
        <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <MessageSquareDiff className="h-6 w-6"/>
                    <span className="">Feedbacker</span>
                </Link>
                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                    <Bell className="h-4 w-4"/>
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </div>
            <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    <Link
                        href="/"
                        className={`${currentPath === '/' ? 'text-primary' : 'text-muted-foreground'} flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary`}
                    >
                        <Home className="h-4 w-4"/>
                        Dashboard
                    </Link>
                    <Link
                        href="/projects"
                        className={`${currentPath === '/projects' ? 'text-primary' : 'text-muted-foreground'} flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary`}
                    >
                        <PanelsTopLeft className="h-4 w-4"/>
                        Projects
                    </Link>
                </nav>
            </div>
        </div>
    </div>
    )
}