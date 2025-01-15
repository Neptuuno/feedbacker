import {Form} from "@/lib/Entities/Form";
import {fetchWrapper} from "@/lib/fetchwrapper";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Separator} from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"



async function getData(params: { string: string }): Promise<Form> {
    const url = `${process.env.API_URL}/forms/${(params).string}`;
    return await fetchWrapper(url);
}

export default async function FormDetail(
    props: {
        params: Promise<{ string: string }>
    }
) {
    const params = await props.params;
    const form: Form = await getData(params);

    return (
        <Tabs defaultValue="overview" className="">
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
            <TabsContent value="link">
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