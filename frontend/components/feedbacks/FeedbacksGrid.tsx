import {Project} from "@/lib/Entities/Project";

interface FeedbacksGridProps {
    project: Project;
}

export default function FeedbacksGrid({project}: FeedbacksGridProps) {
    console.log(project)

    return (
        <div>
            <h3>Grid feedback view</h3>
        </div>
    )

}