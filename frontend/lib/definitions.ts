import {z} from 'zod'

export const createProjectFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
});

export const loginFormSchema = z.object({
    email: z.string().email({
        message: "Enter an email"
    })
        .min(2, {
            message: "Email must be at least 2 characters.",
        }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});