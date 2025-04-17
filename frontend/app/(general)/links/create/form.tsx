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
import {createLink} from "@/app/(general)/links/create/action";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Form as EntityForm} from "@/lib/Entities/Form";
import {Checkbox} from "@/components/ui/checkbox";
import {useSearchParams} from "next/navigation";

const initialState = {
    errors: {
        name: undefined,
        isActive: undefined,
        formId: undefined
    },
    message: undefined
};

interface CreateFormFormProps {
    forms: EntityForm[];
}

export function CreateLinkForm({forms}: CreateFormFormProps) {
    const [state, formAction, pending] = useActionState(createLink, initialState)
    const params = useSearchParams();

    const initialValues = {
        name: "",
        isActive: true,
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
                            <FormLabel>Link Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter link name" {...field} />
                            </FormControl>
                            <FormDescription>
                                The name of your Link.
                            </FormDescription>
                            <FormMessage>{state?.errors?.name}</FormMessage>
                        </FormItem>
                    )}
                />

                {/* Islink Active */}
                <FormField
                    control={form.control}
                    name="isActive"
                    render={({field}) => (
                        <FormItem className="flex flex-row items-start gap-2 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    {...{ ...field, value: field.value ? "true" : "false" }}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Is link active?
                                </FormLabel>
                                <FormDescription>
                                    By default links are active, therefore responders can fill your forms as soon as you
                                    create a link.
                                </FormDescription>
                                <FormMessage>{state?.errors?.isActive}</FormMessage>
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
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={params.get('formId') ? params.get('formId')?.toString() : forms[0].id.toString()}
                                {...{ ...field, value: field.value?.toString()}}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder="Select form associated with the link."/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {forms.map((form) => (
                                        <SelectItem key={form.id} value={form.id.toString()}>
                                            <p>{form.name}</p>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Select form associated with the link.
                            </FormDescription>
                            <FormMessage>{state?.errors?.formId}</FormMessage>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {state?.message && <p className="text-red-500 text-sm">{state?.message}</p>}

                {/* Submit Button */}
                <Button disabled={pending} type="submit">Create Link</Button>
            </form>
        </Form>
    );
}
