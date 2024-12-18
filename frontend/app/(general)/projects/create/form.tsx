"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
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
import {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {fetchWrapper} from "@/lib/fetchwrapper";
import { useRouter } from 'next/navigation'


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
});

export function CreateProjectForm() {
    const [error, setError] = useState<string | null>(null);
    const {toast} = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const url = `${process.env.API_URL}/projects`;
            await fetchWrapper(url, {
                method: "POST",
                body: JSON.stringify(values),
            });
            toast({
                title: "Project created",
                description: "Your project has been created successfully.",
            })
            router.push("/projects")

        } catch (error: unknown) {
            setError("Something went wrong when creating a new project");
            console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Project Name */}
                <FormField
                    control={form.control}
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
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {/* Project Description */}
                <FormField
                    control={form.control}
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
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {/*<p className="text-red-500 text-sm">test</p>*/}

                {/* Submit Button */}
                <Button type="submit">Create Project</Button>
            </form>
        </Form>
    );
}
