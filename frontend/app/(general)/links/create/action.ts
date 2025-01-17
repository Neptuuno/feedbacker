'use server';

import {createLinkFormSchema} from "@/lib/definitions";
import {fetchWrapper} from "@/lib/fetchwrapper";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {Project} from "@/lib/Entities/Project";

export async function createLink(prevState: any, formData: FormData) {
    const validatedFields = createLinkFormSchema.safeParse({
        name: formData.get('name'),
        isActive: (formData.get('isActive') as string | null) === "true",
        formId: parseInt(formData.get('formId') as string | "") || undefined,
    })

    console.log(formData.get('formId'))

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: undefined
        }
    }

    console.log(JSON.stringify(validatedFields.data))

    let success = false
    try {
        const url = `${process.env.API_URL}/links`;
        await fetchWrapper(url,{
            method: 'POST',
            body: JSON.stringify(validatedFields.data),
        })
        success = true;
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

    if (success) {
        revalidatePath('forms');
        redirect(`/forms/${validatedFields.data.formId}`);
    }

}