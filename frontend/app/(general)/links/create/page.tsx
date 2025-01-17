import {CreateLinkForm} from "./form";
import {Form} from "@/lib/Entities/Form";
import {fetchWrapper} from "@/lib/fetchwrapper";

async function getFormsData(): Promise<Form[]> {
    const url = `${process.env.API_URL}/forms`;
    return await fetchWrapper(url);
}

export default async function CreateLink() {
    const forms = await getFormsData();
    return <div className="lg:max-w-[50%]">
        <h1>Create link</h1>
        <CreateLinkForm forms={forms}/>
    </div>
}