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
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {loginFormSchema} from "@/lib/definitions";
import {login} from "@/app/(auth)/login/action";

const initialState = {
    errors: {
        email: undefined,
        password: undefined
    },
    message: undefined
};

export function LoginForm() {
    const [state, formAction, pending] = useActionState(login, initialState)
    
    const initialValues = {
        email: "",
        password: "",
    };

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: initialValues,
    });

    return (
        <Form {...form} >
            <form action={formAction} className="space-y-8">

                <FormField
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="jan.novak@seznam.cz" {...field} />
                            </FormControl>
                            <FormMessage>{state?.errors?.email}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Textarea placeholder="******" {...field} />
                            </FormControl>
                            <FormMessage>{state?.errors?.password}</FormMessage>
                        </FormItem>
                    )}
                />

                {state?.message && <p className="text-red-500 text-sm">{state?.message}</p>}

                {/* Submit Button */}
                <Button disabled={pending} type="submit">Login</Button>
            </form>
        </Form>
    );
}
