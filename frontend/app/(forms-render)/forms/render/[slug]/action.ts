'use server';

import {createFeedbackFormSchema,} from "@/lib/definitions";
import {fetchWrapper} from "@/lib/fetchwrapper";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {Feedback} from "@/lib/Entities/Feedback";
import {cookies} from "next/headers";

export async function createFeedback(prevState: any, formData: FormData) {
    const cookieStore = await cookies();
    const validatedFields = createFeedbackFormSchema.safeParse({
        message: formData.get('message'),
        slug: formData.get('slug'),
        rating: parseInt(formData.get('rating') as string | "") || undefined,
        userAgent: formData.get('userAgent'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: undefined
        }
    }

    let linkSlug: string | null = null;

    try {
        const url = `${process.env.API_URL}/feedbacks`;
        const data: Feedback = await fetchWrapper(url, {
            method: 'POST',
            body: JSON.stringify(validatedFields.data),
            headers: {
                'User-Agent': validatedFields.data.userAgent
            }
        })
        linkSlug = data.link.slug;
        cookieStore.set({
            name: `form_submitted_${data.form.id}`,
            value: 'true',
            maxAge: 365 * 24 * 60 * 60
        });
    } catch (e: unknown) {
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

    if (linkSlug) {
        revalidatePath('forms/render');
        redirect(`/forms/render/${linkSlug}`);
    }

}