import {User} from "@/lib/Entities/User";

export interface Project {
    id: number
    name: string
    description: string
    user: User
}