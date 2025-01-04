"use client";

import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
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
import {loginFormSchema} from "@/lib/definitions";
import {login} from "@/app/(auth)/actions";

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
            <form action={formAction} className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>

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
                                <Input type="password" placeholder="******" {...field} />
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
