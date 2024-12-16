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

async function getData() {
    const res = await fetch('http://172.17.0.1:3000/projects',{
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoic3RyaW5nQHN0cmluZy5jeiIsImlhdCI6MTczNDI5OTg4NywiZXhwIjoxNzM0MzAwNzg3fQ.2n9CTu6DjXNhKDpMdLdz5yXl2_MSUB3M7tTlYS77q5A"
        }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Projects() {
    const projects = await getData()
    return (
        <div>
        {
            projects.map((project: Project) => (
                <Card key={project.id} className="w-[350px]">
                    <CardHeader>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Edit</Button>
                        <Link href={"/projects/" + project.id }><Button>View</Button></Link>
                    </CardFooter>
                </Card>

            ))
        }
        </div>
    )
}