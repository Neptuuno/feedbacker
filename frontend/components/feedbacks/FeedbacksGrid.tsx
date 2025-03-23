import {Project} from "@/lib/Entities/Project";
import DigitWithTextCard from "@/components/feedbacks/cards/DigitWithTextCard";
import {RatingsChart} from "@/components/charts/RatingsChart";
import {DevicesChart} from "@/components/charts/DevicesChart";

interface FeedbacksGridProps {
    project: Project;
}

export default function FeedbacksGrid({project}: FeedbacksGridProps) {

    if (project.chartsData?.totalFeedbacks === 0) {
        return (
            <div className="flex flex-col gap-4 items-center justify-center h-full">
                <h3 className="text-2xl font-bold tracking-tight">
                    You have no feedback yet
                </h3>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {project.chartsData?.totalFeedbacks && <DigitWithTextCard digit={project.chartsData.totalFeedbacks} text={'Total feedbacks'}/>}
            {project.chartsData?.rating && <RatingsChart rating={project.chartsData?.rating}/>}
            {project.chartsData?.devices && <DevicesChart devices={project.chartsData?.devices}/>}
        </div>
    )

}