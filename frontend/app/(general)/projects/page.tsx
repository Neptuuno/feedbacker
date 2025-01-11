import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
        <div>
            <div className="mb-4 flex gap-2">
                <Link href="/projects/create"><Button>Add new project</Button></Link>
                <Select defaultValue="grid">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select view"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Select view</SelectLabel>
                            <SelectItem value="grid">Grid</SelectItem>
                            <SelectItem value="table">Table</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
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
            <Table>
                <TableCaption>A list of all your projects.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Image</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        projects.map((project: Project) => (
                            <TableRow key={project.id}>
                                <TableCell className="font-medium">{project.name}</TableCell>
                                <TableCell>{project.description}</TableCell>
                                {project?.imagePath && <TableCell>
                                    <Image className="rounded-full" src={`${process.env.API_URL}/${project.imagePath}`}
                                           alt="project image" width={32} height={32}/>
                                </TableCell>}
                                <TableCell>
                                    <div className="flex gap-2 justify-end">
                                        <Button variant="outline">Edit</Button>
                                        <Link href={"/projects/" + project.id}><Button>View</Button></Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}