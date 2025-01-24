import {Form} from "@/lib/Entities/Form";
import {fetchWrapper} from "@/lib/fetchwrapper";
import {GalleryVerticalEnd} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {CreateFeedbackForm} from "@/app/(forms-render)/forms/render/[slug]/form";
import {Link} from "@/lib/Entities/Link";
import {Metadata} from "next";


async function getData(slug: string): Promise<Link> {
    const url = `${process.env.API_URL}/links?slug=${slug}`;
    return await fetchWrapper(url);
}

export const metadata: Metadata = {}

export default async function FormRender({params}: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const link: Link = await getData(slug);
    const form: Form = link.form;
    metadata.title = form.title;

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <GalleryVerticalEnd className="size-4"/>
                    </div>
                    Acme Inc.
                </a>
                <div>
                    <div className="flex flex-col gap-6">
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle className="text-xl">{form.title}</CardTitle>
                                <CardDescription>
                                    {form.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CreateFeedbackForm slug={slug}/>
                            </CardContent>
                        </Card>
                        <div
                            className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                            and <a href="#">Privacy Policy</a>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}