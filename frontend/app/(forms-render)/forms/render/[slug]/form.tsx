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
import {Textarea} from "@/components/ui/textarea";
import {useActionState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {createFormFormSchema} from "@/lib/definitions";
import {ColorPicker} from "@/components/ui/color-picker";
import {createForm} from "@/app/(general)/forms/create/action";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Project} from "@/lib/Entities/Project";
import Image from "next/image";
import {useSearchParams} from "next/navigation";

const initialState = {
    errors: {
        name: undefined,
        title: undefined,
        description: undefined,
        color: undefined,
        projectId: undefined,
    },
    message: undefined,
};

interface CreateFeedbackFormProps {
    projects: Project[];
}

export function CreateFormForm({projects}: CreateFeedbackFormProps) {
    const [state, formAction, pending] = useActionState(createForm, initialState);
    const params = useSearchParams();

    const initialValues = {
        name: "",
        title: "",
        description: "",
        color: "#0f0f0f",
        projectId: undefined,
    };

    const form = useForm<z.infer<typeof createFormFormSchema>>({
        resolver: zodResolver(createFormFormSchema),
        defaultValues: initialValues,
    });

    return (
        <Form {...form}>
            <form action={formAction} className="space-y-8">
                {/* Form Name */}
                <FormField
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Form Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter form name" {...field} />
                            </FormControl>
                            <FormDescription>
                                The name of your form that is visible only for you in Feedbacker.
                            </FormDescription>
                            <FormMessage>{state?.errors?.name}</FormMessage>
                        </FormItem>
                    )}
                />

                {/* Form ProjectId */}
                <FormField
                    control={form.control}
                    name="projectId"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Project</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={params.get('projectId') ? params.get('projectId')?.toString() : projects[0].id.toString()}
                                {...{ ...field, value: field.value?.toString()}}>
                                <FormControl>
                                    <SelectTrigger>
                                        <Input type="hidden" {...field} />
                                        <SelectValue placeholder="Select project associated with the form."/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {projects.map((project) => (
                                        <SelectItem key={project.id} value={project.id.toString()}>
                                            <div className="flex gap-2 items-center">
                                                <p>{project.name}</p>
                                                {project.imagePath &&
                                                    <Image className="rounded-full w-6 h-6"
                                                        width={32} height={32}
                                                           src={`${process.env.NEXT_PUBLIC_API_URL}/${project.imagePath}`}
                                                           alt="project image"/>
                                                }
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Select project associated with the form.
                            </FormDescription>
                            <FormMessage>{state?.errors?.projectId}</FormMessage>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {/* Form Title */}
                <FormField
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Form Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter form title" {...field} />
                            </FormControl>
                            <FormDescription>
                                The title of your form for responders.
                            </FormDescription>
                            <FormMessage>{state?.errors?.title}</FormMessage>
                        </FormItem>
                    )}
                />

                {/* Form Description */}
                <FormField
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Form Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter form description" {...field} />
                            </FormControl>
                            <FormDescription>
                                A detailed description of your form for responders.
                            </FormDescription>
                            <FormMessage>{state?.errors?.description}</FormMessage>
                        </FormItem>
                    )}
                />

                {/* Color Picker */}
                <FormField
                    name="color"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Form Color</FormLabel>
                            <FormControl>
                                <Input type="hidden" {...field} />
                            </FormControl>
                            <ColorPicker
                                onChange={(v) => field.onChange(v)}
                                value={field.value}
                            />
                            <FormDescription>
                                Select a color for your form.
                            </FormDescription>
                            <FormMessage>{state?.errors?.color}</FormMessage>
                        </FormItem>
                    )}
                />

                {state?.message && <p className="text-red-500 text-sm">{state?.message}</p>}

                {/* Submit Button */}
                <Button disabled={pending} type="submit">
                    Create form
                </Button>
            </form>
        </Form>
    );
}
