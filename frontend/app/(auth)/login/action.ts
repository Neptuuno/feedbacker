'use server';

import {loginFormSchema} from "@/lib/definitions";
import {fetchWrapper} from "@/lib/fetchwrapper";

export async function login(prevState: any, formData: FormData) {
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

    try {
        const url = `${process.env.API_URL}/auth/login`;
        await fetchWrapper(url,{
            method: 'POST',
            body: JSON.stringify(validatedFields.data)
        })
    }
    catch (e) {
        console.log(e)
    }


}