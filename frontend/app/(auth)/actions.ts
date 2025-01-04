'use server';

import {loginFormSchema} from "@/lib/definitions";
import {fetchWrapper} from "@/lib/fetchwrapper";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export async function login(prevState: any, formData: FormData) {
    const cookieStore = await cookies()
    const validatedFields = loginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: undefined
        }
    }

    let success = false;
    try {
        const url = `${process.env.API_URL}/auth/login`;
        const data: { access_token: string } = await fetchWrapper(url, {
            method: 'POST',
            body: JSON.stringify(validatedFields.data),
        });
        cookieStore.set('access_token', data.access_token, {
            maxAge: 1000 * 60 * 15
        })
        success = true;
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
    if (success) redirect('/')
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('access_token');
    redirect('/login')
}