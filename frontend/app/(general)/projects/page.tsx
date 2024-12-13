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


export default async function Projects() {
    const data = await fetch('http://localhost:3000/projects', {
        credentials: 'include'
    });
    const projects = await data.json();
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
                        <Button>View</Button>
                    </CardFooter>
                </Card>

            ))
        }
        </div>
    )
}