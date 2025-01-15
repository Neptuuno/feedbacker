import {Project} from "@/lib/Entities/Project";
import {fetchWrapper} from "@/lib/fetchwrapper";
import ProjectsView from "@/components/projects/ProjectsView";

async function getProjectsData(): Promise<Project[]> {
    const url = `${process.env.API_URL}/projects`;
    return await fetchWrapper(url);
}

export default async function Projects() {
    const projects = await getProjectsData()
    return (
        <ProjectsView projects={projects}/>
    )
}