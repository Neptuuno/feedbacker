import { CreateFormForm } from "./form";
import {Project} from "@/lib/Entities/Project";
import {fetchWrapper} from "@/lib/fetchwrapper";


async function getProjectsData(): Promise<Project[]> {
    const url = `${process.env.API_URL}/projects`;
    return await fetchWrapper(url);
}

export default async function CreateForm() {
    const projects = await getProjectsData();
    return <div className="lg:max-w-[50%]">
        <h1>Create form</h1>
        <CreateFormForm projects={projects}/>
    </div>
}