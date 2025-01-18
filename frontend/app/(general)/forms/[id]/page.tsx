import {Form} from "@/lib/Entities/Form";
import {Link as EntityLink} from "@/lib/Entities/Link";
import {fetchWrapper} from "@/lib/fetchwrapper";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Separator} from "@/components/ui/separator";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Checkbox} from "@/components/ui/checkbox";
import {QrCode} from "lucide-react";
import QrCodeDialog from "@/components/forms/QrCodeDialog";


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
                        <TabsTrigger value="forms">Forms</TabsTrigger>
                        <TabsTrigger value="feedback">Feedback</TabsTrigger>
                    </TabsList>
                </div>
                {/*{*/}
                {/*    form.imagePath &&*/}
                {/*    <Card className="w-64">*/}
                {/*        <CardContent className="p-3">*/}
                {/*            <Image className="rounded-xl"*/}
                {/*                   src={`${process.env.API_URL}/${form.imagePath}`}*/}
                {/*                   alt="project image"*/}
                {/*                   width={500} height={500}/>*/}
                {/*        </CardContent>*/}
                {/*    </Card>*/}
                {/*}*/}
            </div>
            <Separator className="my-8"/>
            <Link className="mb-2" href={`/links/create?formId=${form.id}`}><Button>Add new link</Button></Link>
            <TabsContent value="links">
                {form.links &&
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
                            {form.links.map((link) => (
                                <TableRow key={link.id}>
                                    <TableCell className="font-medium">{link.name}</TableCell>
                                    <TableCell>
                                        <Checkbox
                                            checked={link.isActive}
                                        />
                                    </TableCell>
                                    <TableCell>{link.slug}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2 justify-end">
                                            <QrCodeDialog/>
                                            <Button variant="outline">Edit</Button>
                                            <Link href={`/forms/render/${link.slug}`}>
                                                <Button>View</Button>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </TabsContent>
            <TabsContent value="forms">Change your password here.</TabsContent>
            <TabsContent value="feedback">feedback.</TabsContent>
        </Tabs>
    )
}