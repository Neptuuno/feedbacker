import {Form} from "@/lib/Entities/Project";
import {fetchWrapper} from "@/lib/fetchwrapper";
import Image from "next/image";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Separator} from "@/components/ui/separator";


async function getData(params: { id: number }): Promise<Form> {
    const url = `${process.env.API_URL}/projects/${(params).id}`;
    return await fetchWrapper(url);
}

export default async function ProjectDetail(
    props: {
        params: Promise<{ id: number }>
    }
) {
    const params = await props.params;
    const project: Form = await getData(params);

    return (
        <Tabs defaultValue="overview" className="">
            <div className="flex justify-between">
                <div>
                    <Card className="w-64">
                        <CardHeader>
                            <CardTitle className="text-4xl">{project.name}</CardTitle>
                            <CardDescription className="text-xl">{project.description}</CardDescription>
                        </CardHeader>
                    </Card>
                    <TabsList className="my-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="forms">Forms</TabsTrigger>
                        <TabsTrigger value="feedback">Feedback</TabsTrigger>
                    </TabsList>
                </div>
                {
                    project.imagePath &&
                    <Card className="w-64">
                        <CardContent className="p-3">
                            <Image className="rounded-xl"
                                   src={`${process.env.API_URL}/${project.imagePath}`}
                                   alt="project image"
                                   width={500} height={500}/>
                        </CardContent>
                    </Card>
                }
            </div>
            <Separator className="my-8"/>
            <TabsContent value="overview">Make changes to your account here.</TabsContent>
            <TabsContent value="forms">Change your password here.</TabsContent>
            <TabsContent value="feedback">feedback.</TabsContent>
        </Tabs>
    )
}