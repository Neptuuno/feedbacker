import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Project} from "@/lib/Entities/Project";
import Link from "next/link";
import {fetchWrapper} from "@/lib/fetchwrapper";
import Image from "next/image";

async function getProjectData(): Promise<Project[]> {
    const url = `${process.env.API_URL}/projects`;
    return await fetchWrapper(url);
}

export default async function Projects() {
    const projects = await getProjectData()
    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {
                projects.map((project: Project) => (
                    <Card key={project.id} className="w-[350px]">
                        <CardHeader>
                            <CardTitle>{project.name}</CardTitle>
                            <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        {project?.imagePath && <CardContent>
                            <Image className="rounded-xl" src={`${process.env.API_URL}/${project.imagePath}`}
                                   alt="project image" width={500} height={300}/>
                        </CardContent>}
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Edit</Button>
                            <Link href={"/projects/" + project.id}><Button>View</Button></Link>
                        </CardFooter>
                    </Card>

                ))
            }
        </div>
    )
}