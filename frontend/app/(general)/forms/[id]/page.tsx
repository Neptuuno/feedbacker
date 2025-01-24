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
                }
            </TabsContent>
            <TabsContent value="feedback">
                {form.feedbacks &&
                    <Table>
                        <TableCaption>A list of feedbacks for form.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Message</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Platform</TableHead>
                                <TableHead>Device</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {form.feedbacks.map((feedback) => (
                                <TableRow key={feedback.id}>
                                    <TableCell className="font-medium">{feedback.message ? feedback.message : '-'}</TableCell>
                                    <TableCell>{feedback.rating}</TableCell>
                                    <TableCell>{feedback.platform}</TableCell>
                                    <TableCell>{feedback.device}</TableCell>
                                    {/*<TableCell>*/}
                                    {/*    <div className="flex gap-2 justify-end">*/}
                                    {/*        <QrCodeDialog slug={feedback.slug}/>*/}
                                    {/*        <Button variant="outline">Edit</Button>*/}
                                    {/*        <Link target="_blank" href={`/forms/render/${feedback.slug}`}>*/}
                                    {/*            <Button className="flex gap-2">View<SquareArrowOutUpRight/></Button>*/}
                                    {/*        </Link>*/}
                                    {/*    </div>*/}
                                    {/*</TableCell>*/}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </TabsContent>
        </Tabs>
    )
}