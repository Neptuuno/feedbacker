import {CreateProjectForm} from "../form";
import {Project} from "@/lib/Entities/Project";
import {fetchWrapper} from "@/lib/fetchwrapper";
import Link from "next/link";

async function getProjectData(projectId: number): Promise<Project> {
    const url = `${process.env.API_URL}/projects/${projectId}`;
    return await fetchWrapper(url);
}

export default async function EditProject({params}: { params: Promise<{ id: number }> }) {
    const project = await getProjectData((await params).id);
    return <div className="lg:max-w-[50%]">
        <h1>Update project <Link className="underline" target="_blank"
                                 href={`/projects/${project.id}`}>{project.name}</Link></h1>
        <CreateProjectForm project={project}/>
    </div>
}