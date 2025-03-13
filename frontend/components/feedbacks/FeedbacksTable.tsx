"use client";

import {Button} from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {Feedback} from "@/lib/Entities/Feedback";

interface FeedbacksViewProps {
    feedbacks: Feedback[];
}

export default function FeedbacksTable({feedbacks}: FeedbacksViewProps) {

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
            <Table>
                <TableCaption>A list of all your feedback.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Image</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {feedbacks.map((feedback) => (
                        <TableRow key={feedback.id}>
                            <TableCell className="font-medium">{feedback.message}</TableCell>
                            <TableCell>{feedback.device}</TableCell>
                            <TableCell>{feedback.platform}</TableCell>
                            <TableCell>{feedback.rating}</TableCell>
                            <TableCell>
                                <div className="flex gap-2 justify-end">
                                    <Button variant="outline">Edit</Button>
                                    <Link href={`/projects/${feedback.id}`}>
                                        <Button>View</Button>
                                    </Link>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
