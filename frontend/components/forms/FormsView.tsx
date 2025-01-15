"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {Form} from "@/lib/Entities/Form";

interface FormsViewProps {
    forms: Form[];
}

export default function FormsView({forms}: FormsViewProps) {
    const [view, setView] = useState<"grid" | "table">("grid");

    return (
        <div>
            {/* Action Header */}
            <div className="mb-4 flex gap-2">
                <Link href="/forms/create">
                    <Button>Add new form</Button>
                </Link>
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
                <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                    {forms.map((form) => (
                        <Card key={form.id} className="w-[350px]">
                            <CardHeader>
                                <div className="flex justify-between">
                                    <CardTitle>{form.name}</CardTitle>
                                    <div style={{backgroundColor: form.color}} className="w-8 h-8 rounded-full"></div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <h3>{form.title}</h3>
                                <p>{form.description}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">Edit</Button>
                                <Link href={`/forms/${form.id}`}>
                                    <Button>View</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {/* Table View */}
            {view === "table" && (
                <Table>
                    <TableCaption>A list of all your forms.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Color</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {forms.map((form) => (
                            <TableRow key={form.id}>
                                <TableCell className="font-medium">{form.name}</TableCell>
                                <TableCell>{form.title}</TableCell>
                                <TableCell>{form.description}</TableCell>
                                <TableCell>
                                    <div style={{backgroundColor: form.color}} className="w-8 h-8 rounded-full"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2 justify-end">
                                        <Button variant="outline">Edit</Button>
                                        <Link href={`/forms/${form.id}`}>
                                            <Button>View</Button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
