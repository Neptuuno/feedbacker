import {Project} from "@/lib/Entities/Project";
import { PieChartComponent } from "@/components/charts/PieChart";

interface FeedbacksGridProps {
    project: Project;
}

export default function FeedbacksGrid({project}: FeedbacksGridProps) {
    console.log(project.chartsData)

    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            <PieChartComponent/>
            <PieChartComponent/>
            <PieChartComponent/>
            <PieChartComponent/>
            <PieChartComponent/>
            <PieChartComponent/>
            <PieChartComponent/>
            <PieChartComponent/>
            <PieChartComponent/>
            <PieChartComponent/>
            <PieChartComponent/>
        </div>
    )

}