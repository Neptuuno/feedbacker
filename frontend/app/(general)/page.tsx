"use client";

import {buttonVariants} from "@/components/ui/button"
import Link from "next/link";

export default function Dashboard() {
    return (
        <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
        >
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                    You have no projects
                </h3>
                <p className="text-sm text-muted-foreground">
                    You can start collecting feedback as soon as you add a project.
                </p>
                <Link href="/projects/create/" className={`${buttonVariants({ variant: "default" })} mt-4`}>Add Project</Link>
            </div>
        </div>
    )
}
