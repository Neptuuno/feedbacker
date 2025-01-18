import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {QrCode} from "lucide-react";
import Link from "next/link";

export default function QrCodeDialog({slug}: {slug: string}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline" size="icon"><QrCode/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>QR Code</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <h1>{slug}</h1>
                        <Link target="_blank" href={`${process.env.BASE_URL}/forms/render/${slug}`}>{`${process.env.BASE_URL}/forms/render/${slug}`}</Link>
                    </div>
                </div>
                <DialogFooter className="flex justify-between">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}