'use server';

import {createProjectFormSchema} from "@/lib/definitions";
import {fetchWrapper} from "@/lib/fetchwrapper";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {Project} from "@/lib/Entities/Project";

export async function createProject(prevState: any, formData: FormData) {
    const validatedFields = createProjectFormSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        image: formData.get('image'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: undefined
        }
    }

    const newFormData = new FormData();
    newFormData.append("name",validatedFields.data.name)
    newFormData.append("description",validatedFields.data.description)
    newFormData.append("file",validatedFields.data.image)

    console.log(newFormData)

    let projectId: number | null = null;
    try {
        const url = `${process.env.API_URL}/projects`;
        const data: Project = await fetchWrapper(url,{
            method: 'POST',
            body: newFormData,
        })
        projectId = data.id;
    }
    catch (e: unknown) {
        let errorMessage = "An unexpected error occurred.";

        if (e instanceof Error) {
            errorMessage = e.message;
        } else if (typeof e === "string") {
            errorMessage = e;
        }

        return {
            errors: undefined,
            message: errorMessage,
        };
    }

    if (projectId) {
        revalidatePath('projects');
        redirect(`/projects/${projectId}`);
    }

}