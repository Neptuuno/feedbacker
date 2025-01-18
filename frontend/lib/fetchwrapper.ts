import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export type FetchOptions = Omit<RequestInit, "headers"> & {
    headers?: Record<string, string>;
};

export const fetchWrapper = async <T>(
    url: string,
    options: FetchOptions = {}
): Promise<T> => {
    const { headers, ...restOptions } = options;
    const token = (await cookies()).get("access_token");

    const defaultHeaders: HeadersInit = {
        ...(options?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...(token?.value && { Authorization: `Bearer ${token.value}` }),
    };

    const response = await fetch(url, {
        headers: {
            ...defaultHeaders,
            ...headers,
        },
        ...restOptions,
    });

    if (!response.ok) {
        if (response.status === 401){
            //TODO implement refresh tokens
            const lastPathname = (await cookies()).get("last_pathname");

            if (lastPathname?.value){
                const redirectUrl = new URL('/login', process.env.BASE_URL);
                redirectUrl.searchParams.set('redirect', lastPathname.value);
                redirect(redirectUrl.toString());
            }
        }
        const error = await response.json();
        throw new Error(error.message || "Fetch error");
    }

    return response.json();
};
