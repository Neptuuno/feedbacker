import {Project} from "@/lib/Entities/Project";

interface FeedbacksGridProps {
    project: Project;
}

export default function FeedbacksGrid({project}: FeedbacksGridProps) {
    const feedbacks = project.forms.flatMap((form) => form.feedbacks)

    return (
        <div>
            <h3>Grid feedback view</h3>
        </div>
    )

}