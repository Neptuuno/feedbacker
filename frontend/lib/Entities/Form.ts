import {User} from "@/lib/Entities/User";
import {Link} from "@/lib/Entities/Link";
import { Feedback } from "./Feedback";

export interface Form {
    id: number
    name: string
    title: string
    description: string
    color: string,
    user: User
    links: Link[]
    feedbacks: Feedback[]
}