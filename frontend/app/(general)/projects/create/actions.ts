'use server';

import {createProjectFormSchema} from "@/lib/definitions";

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

    return {message: 'Please enter a valid name'}

    // Return early if the form data is invalid


}