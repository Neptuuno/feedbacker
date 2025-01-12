import {Form} from "@/lib/Entities/Form";
import {fetchWrapper} from "@/lib/fetchwrapper";
import FormsView from "@/components/forms/FormsView";

async function getFormData(): Promise<Form[]> {
    const url = `${process.env.API_URL}/forms`;
    return await fetchWrapper(url);
}

export default async function Forms() {
    const forms = await getFormData()
    return (
        <FormsView forms={forms}/>
    )
}