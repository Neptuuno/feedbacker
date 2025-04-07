import {Project} from "@/lib/Entities/Project";
import {fetchWrapper} from "@/lib/fetchwrapper";
import Image from "next/image";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Separator} from "@/components/ui/separator";
import FormsView from "@/components/forms/FormsView";
import FeedbacksView from "@/components/feedbacks/FeedbacksView";


async function getData(params: { id: number }): Promise<Project> {
    const url = `${process.env.API_URL}/projects/${(params).id}`;
    return await fetchWrapper(url);
}

export default async function ProjectDetail(
    props: {
        params: Promise<{ id: number }>
    }
) {
    const params = await props.params;
    const project: Project = await getData(params);

    return (
        <Tabs defaultValue="forms" className="">
            <div className="flex flex-col md:flex-row justify-between">
                <div>
                    <Card className="w-64">
                        <CardHeader>
                            <CardTitle className="text-4xl">{project.name}</CardTitle>
                            <CardDescription className="text-xl">{project.description}</CardDescription>
                        </CardHeader>
                    </Card>
                    <TabsList className="my-4">
                        {project.forms &&
                            <TabsTrigger value="forms">Forms</TabsTrigger>
                        }
                        <TabsTrigger value="feedback">Feedback</TabsTrigger>
                    </TabsList>
                </div>
                {project.imagePath &&
                    <Card className="w-64 mt-4 md:mt-0">
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
            {project.forms &&
                <TabsContent value="forms">
                    <FormsView forms={project.forms}/>
                </TabsContent>
            }

            {project.forms &&
                <TabsContent value="feedback">
                    <FeedbacksView project={project}/>
                </TabsContent>
            }
        </Tabs>
    )
}