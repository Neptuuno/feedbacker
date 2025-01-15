import {Form} from "@/lib/Entities/Form";
import {fetchWrapper} from "@/lib/fetchwrapper";
import Image from "next/image";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Separator} from "@/components/ui/separator";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import Link from "next/link";


async function getData(params: { id: number }): Promise<Form> {
    const url = `${process.env.API_URL}/forms/${(params).id}`;
    return await fetchWrapper(url);
}

export default async function FormDetail(
    props: {
        params: Promise<{ id: number }>
    }
) {
    const params = await props.params;
    const form: Form = await getData(params);

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
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="forms">Change your password here.</TabsContent>
            <TabsContent value="feedback">feedback.</TabsContent>
        </Tabs>
    )
}