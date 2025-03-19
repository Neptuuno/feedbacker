import {User} from "@/lib/Entities/User";
import { Form } from "./Form";

export interface Project {
    id: number
    name: string
    description: string
    imagePath: string,
    user: User,
    forms: Form[]
    chartsData?: {
        rating: {
            [key: string]: number;
            averageRating: number;
        };
        totalFeedbacks: number;
        devices: { name: string; count: number }[];
        platforms: { name: string; count: number }[];
    };

}