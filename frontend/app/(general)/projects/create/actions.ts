'use server'

export async function createProject(formData: FormData){
    const rawFormData = {
        name: formData.get('name'),
        description: formData.get('description'),
    }

    console.log(rawFormData)
}