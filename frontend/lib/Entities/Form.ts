import {User} from "@/lib/Entities/User";
import {Link} from "@/lib/Entities/Link";

export interface Form {
    id: number
    name: string
    title: string
    description: string
    color: string,
    user: User
    links: Link[]
}