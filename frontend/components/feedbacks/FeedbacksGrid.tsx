import {Project} from "@/lib/Entities/Project";
import { PieChartComponent } from "@/components/charts/PieChart";
import DigitWithTextCard from "@/components/feedbacks/cards/DigitWithTextCard";
import {RatingsChart} from "@/components/charts/RatingsChart";

interface FeedbacksGridProps {
    project: Project;
}

export default function FeedbacksGrid({project}: FeedbacksGridProps) {
    console.log(project.chartsData)

    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {project.chartsData?.totalFeedbacks && <DigitWithTextCard digit={project.chartsData.totalFeedbacks} text={'Total feedbacks'}/>}
            {project.chartsData?.rating && <RatingsChart rating={project.chartsData?.rating}/>}
        </div>
    )

}