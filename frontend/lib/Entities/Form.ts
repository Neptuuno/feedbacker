import {User} from "@/lib/Entities/User";

export interface Project {
    id: number
    name: string
    description: string
    imagePath: string,
    user: User
}