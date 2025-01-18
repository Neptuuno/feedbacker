import {Form} from "@/lib/Entities/Form";
import {fetchWrapper} from "@/lib/fetchwrapper";
import {GalleryVerticalEnd} from "lucide-react";
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"


async function getData(slug: string): Promise<Form> {
    const url = `${process.env.API_URL}/links?slug=${slug}`;
    return await fetchWrapper(url);
}

export default async function FormRender({params}: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const form: Form = await getData(slug);

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <GalleryVerticalEnd className="size-4"/>
                    </div>
                    Acme Inc.
                </a>
                <div>
                    <div className="flex flex-col gap-6">
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle className="text-xl">Welcome back</CardTitle>
                                <CardDescription>
                                    Login with your Apple or Google account
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="grid gap-6">
                                        <div
                                            className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                {/*<span className="relative z-10 bg-background px-2 text-muted-foreground">*/}
                {/*  Or continue with*/}
                {/*</span>*/}
                                        </div>
                                        <div className="grid gap-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="m@example.com"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <div className="flex items-center">
                                                    <Label htmlFor="password">Password</Label>
                                                    <a
                                                        href="#"
                                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                                    >
                                                        Forgot your password?
                                                    </a>
                                                </div>
                                                <Input id="password" type="password" required/>
                                            </div>
                                            <Button type="submit" className="w-full">
                                                Login
                                            </Button>
                                        </div>
                                        <div className="text-center text-sm">
                                            Don&apos;t have an account?{" "}
                                            <a href="#" className="underline underline-offset-4">
                                                Sign up
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                        <div
                            className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                            and <a href="#">Privacy Policy</a>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}