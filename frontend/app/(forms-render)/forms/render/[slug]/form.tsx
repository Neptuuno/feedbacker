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
import {useActionState, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {createFeedbackFormSchema} from "@/lib/definitions";
import {createFeedback} from "@/app/(forms-render)/forms/render/[slug]/action";
import {Separator} from "@/components/ui/separator";
import {Textarea} from "@/components/ui/textarea";
import Rating from "@/components/forms/Rating";

const initialState = {
    errors: {
        message: undefined,
        rating: undefined,
        slug: undefined,
        userAgent: undefined,
    },
    message: undefined,
};


export function CreateFeedbackForm({slug}: { slug: string }) {
    const [state, formAction, pending] = useActionState(createFeedback, initialState);
    const [userAgent, setUserAgent] = useState('unknown');

    useEffect(() => {
        setUserAgent(navigator.userAgent);
    }, []);


    const initialValues = {
        message: undefined,
        rating: 0,
        slug: undefined,
        userAgent: undefined
    };

    const form = useForm<z.infer<typeof createFeedbackFormSchema>>({
        resolver: zodResolver(createFeedbackFormSchema),
        defaultValues: initialValues,
    });


    return (
        <Form {...form}>
            <form action={formAction} className="space-y-8">
                <div
                    className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <Separator/>
                </div>

                {/* Feedback Rating */}
                <FormField
                    name="rating"
                    render={({field}) => (
                        <FormItem className="flex flex-col items-center gap-2">
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <Input type="hidden" {...field} />
                            </FormControl>
                            <Rating value={field.value} onChange={field.onChange}/>
                            <FormDescription>
                                Select rating.
                            </FormDescription>
                            <FormMessage>{state?.errors?.rating}</FormMessage>
                        </FormItem>
                    )}
                />

                {/* Feedback Message */}
                <FormField
                    name="message"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea className="h-32" placeholder="Enter message for form owner" {...field} />
                            </FormControl>
                            <FormDescription>
                                The name of your form that is visible only for you in Feedbacker.
                            </FormDescription>
                            <FormMessage>{state?.errors?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                {/* Feedback Slug */}
                <FormField
                    name="slug"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" {...{...field, value: slug}} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* User Agent */}
                <FormField
                    name="userAgent"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" {...{...field, value: userAgent}} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {state?.message && <p className="text-red-500 text-sm">{state?.message}</p>}

                {/* Submit Button */}
                <Button className="w-full" disabled={pending} type="submit">
                    Create form
                </Button>
            </form>
        </Form>
    );
}
