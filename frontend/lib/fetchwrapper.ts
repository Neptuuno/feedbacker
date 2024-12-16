import {cookies} from "next/headers";

export type FetchOptions = Omit<RequestInit, "headers"> & {
    headers?: Record<string, string>;
};

export const fetchWrapper = async <T>(
    url: string,
    options: FetchOptions = {}
): Promise<T> => {
    const { headers, ...restOptions } = options;
    const token = cookies().get("access_token");

    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
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
        const error = await response.json();
        console.log(token)
        throw new Error(error.message || "Fetch error");
    }

    return response.json();
};
