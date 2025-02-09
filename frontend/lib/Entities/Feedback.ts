import {Link} from "@/lib/Entities/Link";
import {Form} from "@/lib/Entities/Form";

export interface Feedback {
    id: number,
    platform: string,
    device: string,
    rating: number,
    message?: string,
    link: Link,
    form: Form
}