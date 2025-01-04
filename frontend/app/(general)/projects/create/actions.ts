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
    catch (e) {
        console.log(e)
    }


}