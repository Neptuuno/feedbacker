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
import {createFeedbackFormSchema} from "@/lib/definitions";
import {ColorPicker} from "@/components/ui/color-picker";
import {createFeedback} from "@/app/(forms-render)/forms/render/[slug]/action";
import {Separator} from "@/components/ui/separator";

const initialState = {
    errors: {
        message: undefined,
        rating: undefined,
        slug: undefined,
    },
    message: undefined,
};


export function CreateFeedbackForm({slug}: {slug: string}) {
    const [state, formAction, pending] = useActionState(createFeedback, initialState);

    const initialValues = {
        message: undefined,
        rating: undefined,
        slug: undefined,
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
                {/* Feedback Message */}
                <FormField
                    name="message"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Form Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter form name" {...field} />
                            </FormControl>
                            <FormDescription>
                                The name of your form that is visible only for you in Feedbacker.
                            </FormDescription>
                            <FormMessage>{state?.errors?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                {/* Feedback Rating */}
                <FormField
                    name="rating"
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
                            <FormMessage>{state?.errors?.rating}</FormMessage>
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

                {state?.message && <p className="text-red-500 text-sm">{state?.message}</p>}

                {/* Submit Button */}
                <Button className="w-full" disabled={pending} type="submit">
                    Create form
                </Button>
            </form>
        </Form>
    );
}
