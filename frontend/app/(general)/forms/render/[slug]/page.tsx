import {Form} from "@/lib/Entities/Form";
import {fetchWrapper} from "@/lib/fetchwrapper";


async function getData(params: { slug: string }): Promise<Form> {
    const url = `${process.env.API_URL}/forms/${(params).slug}`;
    return await fetchWrapper(url);
}

export default async function FormRender(
    props: {
        params: Promise<{ slug: string }>
    }
) {
    const params = await props.params;
    const form: Form = await getData(params);

    return (
        <h1>Form render: {form.name}</h1>
    )
}