import {Form} from "@/lib/Entities/Project";
import {fetchWrapper} from "@/lib/fetchwrapper";
import ProjectsView from "@/components/projects/ProjectsView";

async function getProjectData(): Promise<Form[]> {
    const url = `${process.env.API_URL}/projects`;
    return await fetchWrapper(url);
}

export default async function Projects() {
    const projects = await getProjectData()
    return (
        <ProjectsView projects={projects}/>
    )
}