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
    projectId: z.number().int().positive("Invalid project ID"),
});

export const createLinkFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    isActive: z.boolean({
        message: "You have to choose if link is active or not.",
    }).default(true),
    formId: z.number().int().positive("Invalid form ID"),
});

export const createFeedbackFormSchema = z.object({
    message: z.string().optional(),
    rating: z.number({
        message: 'Rating is required.'
    }).min(1, {
        message: 'Rating must be between 1 and 5'
    }).max(5, {
        message: 'Rating must be between 1 and 5'
    }),
    slug: z.string(),
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