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
import {useActionState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {createLinkFormSchema} from "@/lib/definitions";
import {Checkbox} from "@/components/ui/checkbox";
import {createLink} from "@/app/(general)/links/create/action";
import Link from "next/link";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import Image from "next/image";

const initialState = {
    errors: {
        name: undefined,
        isActive: undefined,
        formId: undefined
    },
    message: undefined
};

export function CreateLinkForm({searchParams}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const [state, formAction, pending] = useActionState(createLink, initialState)

    const initialValues = {
        name: "",
        IsActive: false,
        formId: undefined,
    };

    const form = useForm<z.infer<typeof createLinkFormSchema>>({
        resolver: zodResolver(createLinkFormSchema),
        defaultValues: initialValues,
    });

    return (
        <Form {...form} >
            <form action={formAction} className="space-y-8">
                {/* Link Name */}
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

                {/* Islink Active */}
                <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Is link active?
                                </FormLabel>
                                <FormDescription>
                                    By default links are active, therefore responders can fill your forms as soon as you create a link.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                {/* Link formId */}
                <FormField
                    control={form.control}
                    name="formId"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Form</FormLabel>
                            <Select onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <Input type="hidden" {...field} />
                                        <SelectValue placeholder="Select form associated with the link."/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {projects.map((form) => (
                                        <SelectItem key={form.id} value={form.id.toString()}>
                                            <div className="flex gap-2 items-center">
                                                <p>{form.name}</p>
                                                {form.imagePath &&
                                                    <Image className="rounded-full w-6 h-6"
                                                           width={32} height={32}
                                                           src={`${process.env.NEXT_PUBLIC_API_URL}/${form.imagePath}`}
                                                           alt="project image"/>
                                                }
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Select form associated with the link.
                            </FormDescription>
                            <FormMessage>{state?.errors?.projectId}</FormMessage>
                            <FormMessage/>
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
