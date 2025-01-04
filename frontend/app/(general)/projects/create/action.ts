'use server';

import {createProjectFormSchema} from "@/lib/definitions";
import {fetchWrapper} from "@/lib/fetchwrapper";

export async function createProject(prevState: any, formData: FormData) {
    const validatedFields = createProjectFormSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: undefined
        }
    }

    try {
        const url = `${process.env.API_URL}/projects`;
        await fetchWrapper(url,{
            method: 'POST',
            body: JSON.stringify(validatedFields.data)
        })
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


}