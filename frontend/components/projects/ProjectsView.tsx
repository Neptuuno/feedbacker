"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
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
import Image from "next/image";
import { Project } from "@/lib/Entities/Project";

interface ProjectsViewProps {
    projects: Project[];
}

export default function ProjectsView({ projects }: ProjectsViewProps) {
    const [view, setView] = useState<"grid" | "table">("grid");

    return (
        <div>
            {/* Action Header */}
            <div className="mb-4 flex gap-2">
                <Link href="/projects/create">
                    <Button>Add new project</Button>
                </Link>
                <Select
                    defaultValue="grid"
                    onValueChange={(value) => setView(value as "grid" | "table")}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select view" />
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
                    {projects.map((project) => (
                        <Card key={project.id} className="w-[350px]">
                            <CardHeader>
                                <CardTitle>{project.name}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            {project?.imagePath && (
                                <CardContent>
                                    <Image
                                        className="rounded-xl"
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/${project.imagePath}`}
                                        alt="project image"
                                        width={500}
                                        height={300}
                                    />
                                </CardContent>
                            )}
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">Edit</Button>
                                <Link href={`/projects/${project.id}`}>
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
                    <TableCaption>A list of all your projects.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Image</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="font-medium">{project.name}</TableCell>
                                <TableCell>{project.description}</TableCell>
                                {project?.imagePath && (
                                    <TableCell>
                                        <Image
                                            className="rounded-full"
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/${project.imagePath}`}
                                            alt="project image"
                                            width={32}
                                            height={32}
                                        />
                                    </TableCell>
                                )}
                                <TableCell>
                                    <div className="flex gap-2 justify-end">
                                        <Button variant="outline">Edit</Button>
                                        <Link href={`/projects/${project.id}`}>
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
