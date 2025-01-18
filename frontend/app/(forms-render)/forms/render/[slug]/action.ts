'use server';

import {createFeedbackFormSchema,} from "@/lib/definitions";
import {fetchWrapper} from "@/lib/fetchwrapper";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {Project} from "@/lib/Entities/Project";

export async function createFeedback(prevState: any, formData: FormData) {
    const validatedFields = createFeedbackFormSchema.safeParse({
        message: formData.get('message'),
        slug: formData.get('slug'),
        rating: parseInt(formData.get('rating') as string | "") || undefined,
    })

    console.log(JSON.stringify(validatedFields.data))
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: undefined
        }
    }

    let formId: number | null = null;
    try {
        const url = `${process.env.API_URL}/forms`;
        const data: Project = await fetchWrapper(url,{
            method: 'POST',
            body: JSON.stringify(validatedFields.data)
        })
        formId = data.id;
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

    if (formId) {
        revalidatePath('forms');
        redirect(`/forms/${formId}`);
    }

}