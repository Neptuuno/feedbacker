"use client";

import {useState} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import FeedbacksTable from "@/components/feedbacks/FeedbacksTable";
import { Project } from "@/lib/Entities/Project";
import FeedbacksGrid from "@/components/feedbacks/FeedbacksGrid";

interface FeedbacksViewProps {
    project: Project;
}

export default function FeedbacksView({project}: FeedbacksViewProps) {
    const [view, setView] = useState<"grid" | "table">("grid");

    if (project.forms.length === 0) {
        return (
            <div className="flex flex-col gap-4 items-center justify-center h-full">
                <h3 className="text-2xl font-bold tracking-tight">
                    You have no feedbacks yet
                </h3>
            </div>
        );
    }

    return (
        <div>
            {/* Action Header */}
            <div className="mb-4 flex gap-2">
                <Select
                    defaultValue="grid"
                    onValueChange={(value) => setView(value as "grid" | "table")}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select view"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Select view</SelectLabel>
                            <SelectItem value="grid">Grid</SelectItem>
                            <SelectItem value="table">Table</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Grid View */}
            {view === "grid" && (
                <FeedbacksGrid project={project}/>
            )}

            {/* Table View */}
            {view === "table" && (
                project.forms.map((form) => (
                    <FeedbacksTable key={form.id} feedbacks={form.feedbacks} form={form}/>
                ))
            )}
        </div>
    );
}
