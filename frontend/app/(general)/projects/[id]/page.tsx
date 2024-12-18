import {Project} from "@/lib/Entities/Project";
import {fetchWrapper} from "@/lib/fetchwrapper";

async function getData(params: Promise<{ id: number }>): Promise<Project> {

    const url = `${process.env.API_URL}/projects/${(await params).id}`;
    return await fetchWrapper(url);
}

export default async function ProjectDetail({
                                                params,
                                            }: {
    params: Promise<{ id: number }>
}) {
    const project: Project = await getData(params);

    return (<div>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
    </div>)
}