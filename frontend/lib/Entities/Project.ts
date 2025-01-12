import {User} from "@/lib/Entities/User";

export interface Form {
    id: number
    name: string
    description: string
    imagePath: string,
    user: User
}