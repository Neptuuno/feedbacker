import {Form} from "@/lib/Entities/Form";

export interface Link {
    id: number
    name: string
    slug: string
    isActive: boolean
    form: Form
}