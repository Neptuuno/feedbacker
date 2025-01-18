import {Form} from "@/lib/Entities/Form";
import {fetchWrapper} from "@/lib/fetchwrapper";


async function getData(slug: string): Promise<Form> {
    const url = `${process.env.API_URL}/links?slug=${slug}`;
    return await fetchWrapper(url);
}

export default async function FormRender({params}: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const form: Form = await getData(slug);

    return (
        <h1>Form render: {form.name}</h1>
    )
}