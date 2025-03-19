"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {Feedback} from "@/lib/Entities/Feedback";
import {Form} from "@/lib/Entities/Form";

interface FeedbacksViewProps {
    feedbacks: Feedback[];
    form: Form;
}

export default function FeedbacksTable({feedbacks, form}: FeedbacksViewProps) {

    if (feedbacks.length === 0) {
        return (
            <div className="flex flex-col gap-4 items-center justify-center h-full">
                <h3 className="text-2xl font-bold tracking-tight">
                    You have no feedback yet
                </h3>
            </div>
        );
    }

    return (
        <div>

            <Link target="_blank" href={`/forms/${form.id}`}><h3 className="text-2xl p-2">{form.name}</h3></Link>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Message</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>Device</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {feedbacks.map((feedback) => (
                        <TableRow key={feedback.id}>
                            <TableCell className="font-medium">{feedback.message ? feedback.message : '-'}</TableCell>
                            <TableCell>{feedback.rating}</TableCell>
                            <TableCell>{feedback.platform}</TableCell>
                            <TableCell>{feedback.device}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
