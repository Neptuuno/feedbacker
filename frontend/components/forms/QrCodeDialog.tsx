"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose, DialogFooter,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {QrCode, Share, Download} from "lucide-react";
import {useQRCode} from "next-qrcode";

export default function QrCodeDialog({slug}: { slug: string }) {
    const {SVG} = useQRCode();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline" size="icon"><QrCode/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>QR Code</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center">
                    <SVG
                        text={`${process.env.NEXT_PUBLIC_BASE_URL}/forms/render/${slug}`}
                        options={{
                            margin: 2,
                            width: 200,
                            color: {
                                dark: '#000000',
                                light: '#ffffff',
                            },
                        }}
                    />
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}