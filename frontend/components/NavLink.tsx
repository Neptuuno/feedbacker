"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";

export function NavLink({href, name, icon}: {href: string, name: string, icon: React.ReactNode}) {
    const currentPath = usePathname();

    return (
        <Link
            href={href}
            className={`${currentPath === href ? 'text-primary' : 'text-muted-foreground'} mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground`}
        >
            {icon}
            {name}
        </Link>
    );
}