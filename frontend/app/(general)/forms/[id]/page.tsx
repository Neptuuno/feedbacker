import {Form} from "@/lib/Entities/Form";
import {fetchWrapper} from "@/lib/fetchwrapper";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Separator} from "@/components/ui/separator";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Checkbox} from "@/components/ui/checkbox";
import QrCodeDialog from "@/components/forms/QrCodeDialog";
import {SquareArrowOutUpRight} from "lucide-react";
import FeedbacksTable from "@/components/feedbacks/FeedbacksTable";
import LinksTable from "@/components/links/LinksTable";


async function getFormData(params: { id: number }): Promise<Form> {
    const url = `${process.env.API_URL}/forms/${(params).id}`;
    return await fetchWrapper(url);
}

export default async function FormDetail(
    props: {
        params: Promise<{ id: number }>
    }
) {
    const params = await props.params;
    const form: Form = await getFormData(params)

    return (
        <Tabs defaultValue="links" className="">
            <div className="flex justify-between">
                <div>
                    <Card className="w-64">
                        <CardHeader>
                            <CardTitle className="text-4xl">{form.name}</CardTitle>
                            <CardDescription className="text-xl">{form.description}</CardDescription>
                        </CardHeader>
                    </Card>
                    <TabsList className="my-4">
                        <TabsTrigger value="links">Links</TabsTrigger>
                        <TabsTrigger value="feedback">Feedback</TabsTrigger>
                    </TabsList>
                </div>
            </div>
            <Separator className="my-8"/>
            <TabsContent value="links">
                <Link href={`/links/create?formId=${form.id}`}><Button className="mb-2">Add new link</Button></Link>
                {form.links &&
                    <LinksTable links={form.links}/>
                }
            </TabsContent>
            <TabsContent value="feedback">
                {form.feedbacks &&
                    <FeedbacksTable key={form.id} feedbacks={form.feedbacks} form={form}/>
                }
            </TabsContent>
        </Tabs>
    )
}