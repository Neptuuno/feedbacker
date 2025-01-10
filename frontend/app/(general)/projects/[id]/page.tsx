import {Project} from "@/lib/Entities/Project";
import {fetchWrapper} from "@/lib/fetchwrapper";
import Image from "next/image";

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

    return (<div>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        {project.imagePath &&
            <Image className="rounded-xl" src={`${process.env.API_URL}/${project.imagePath}`} alt="project image"
                   width={500} height={500}/>}
    </div>)
}