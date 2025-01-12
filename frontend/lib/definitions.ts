import {z} from 'zod'

const MAX_FILE_SIZE = 7000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const createProjectFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    image: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 7MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
});

export const createFormFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    color: z.string().regex(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, {
        message: "Color must be a valid hex color code (e.g., #ffffff).",
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