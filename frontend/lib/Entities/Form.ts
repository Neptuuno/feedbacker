import {User} from "@/lib/Entities/User";

export interface Form {
    id: number
    name: string
    title: string
    description: string
    color: string,
    user: User
}