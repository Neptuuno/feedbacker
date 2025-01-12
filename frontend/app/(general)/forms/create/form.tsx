"use client";

import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea"
import {useActionState} from "react";
import {createProject} from "@/app/(general)/projects/create/action";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {createProjectFormSchema} from "@/lib/definitions";

const initialState = {
    errors: {
        name: undefined,
        description: undefined,
        image: undefined
    },
    message: undefined
};

export function CreateProjectForm() {
    const [state, formAction, pending] = useActionState(createProject, initialState)

    const initialValues = {
        name: "",
        description: "",
        image: undefined,
    };

    const form = useForm<z.infer<typeof createProjectFormSchema>>({
        resolver: zodResolver(createProjectFormSchema),
        defaultValues: initialValues,
    });

    return (
        <Form {...form} >
            <form action={formAction} className="space-y-8">
                {/* Project Name */}
                <FormField
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter project name" {...field} />
                            </FormControl>
                            <FormDescription>
                                The name of your project.
                            </FormDescription>
                            <FormMessage>{state?.errors?.name}</FormMessage>
                        </FormItem>
                    )}
                />

                {/* Project Description */}
                <FormField
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Project Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter project description" {...field} />
                            </FormControl>
                            <FormDescription>
                                A detailed description of your project.
                            </FormDescription>
                            <FormMessage>{state?.errors?.description}</FormMessage>
                        </FormItem>
                    )}
                />

                {/* Project Image */}
                <FormField
                    name="image"
                    //eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({field: {value, onChange, ...fieldProps}}) => (
                        <FormItem>
                            <FormLabel>Project Image</FormLabel>
                            <FormControl>
                                <Input
                                    {...fieldProps}
                                    placeholder="Image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                        onChange(event.target.files && event.target.files[0])
                                    }
                                />
                            </FormControl>
                            <FormDescription>
                                The project image.
                            </FormDescription>
                            <FormMessage>{state?.errors?.image}</FormMessage>
                        </FormItem>
                    )}
                />

                {state?.message && <p className="text-red-500 text-sm">{state?.message}</p>}

                {/* Submit Button */}
                <Button disabled={pending} type="submit">Create Project</Button>
            </form>
        </Form>
    );
}
