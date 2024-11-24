"use client";

import {Button} from "@/components/ui/button"
import {useAuthStore} from "@/stores/authStore";

export default function Dashboard() {

    const { accessToken } = useAuthStore();

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
                <Button className="mt-4">Add Project</Button>
                <h1>token: {accessToken}</h1>
            </div>
        </div>
    )
}
