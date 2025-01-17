'use server';

import {createLinkFormSchema} from "@/lib/definitions";
import {fetchWrapper} from "@/lib/fetchwrapper";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {Project} from "@/lib/Entities/Project";

export async function createLink(prevState: any, formData: FormData) {
    const validatedFields = createLinkFormSchema.safeParse({
        name: formData.get('name'),
        isActive: formData.get('isActive'),
        formId: formData.get('formId'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: undefined
        }
    }

    let linkId: number | null = null;
    try {
        const url = `${process.env.API_URL}/projects`;
        const data: Project = await fetchWrapper(url,{
            method: 'POST',
            body: JSON.stringify(validatedFields.data),
        })
        linkId = data.id;
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

    if (linkId) {
        revalidatePath('projects');
        redirect(`/projects/${linkId}`);
    }

}