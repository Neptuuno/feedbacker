"use client";

import {
    Table,
    TableBody, TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link as LinkEntity } from "@/lib/Entities/Link";
import {Checkbox} from "@/components/ui/checkbox";
import Link from "next/link";
import QrCodeDialog from "@/components/forms/QrCodeDialog";
import {Button} from "@/components/ui/button";
import {SquareArrowOutUpRight} from "lucide-react";

export default function LinksTable({ links }: {links: LinkEntity[]}) {
    return (
        <div>
            {links.length === 0 ? (
                <div className="p-2 flex gap-4 items-center justify-start">
                    <h3 className="text-2xl font-semibold tracking-tight">
                        You have no links for this form yet
                    </h3>
                </div>
            ) : (
                <Table>
                    <TableCaption>A list of your links for form.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Is Active</TableHead>
                            <TableHead>Slug</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {links.map((link) => (
                            <TableRow key={link.id}>
                                <TableCell className="font-medium">{link.name}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={link.isActive}
                                    />
                                </TableCell>
                                <TableCell><Link className="underline" target="_blank" href={`${process.env.BASE_URL}/forms/render/${link.slug}`}>{link.slug}</Link></TableCell>
                                <TableCell>
                                    <div className="flex gap-2 justify-end">
                                        <QrCodeDialog slug={link.slug}/>
                                        <Button variant="outline">Edit</Button>
                                        <Link target="_blank" href={`/forms/render/${link.slug}`}>
                                            <Button className="flex gap-2">View<SquareArrowOutUpRight/></Button>
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