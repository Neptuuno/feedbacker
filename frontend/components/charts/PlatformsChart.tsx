"use client"

import * as React from "react"
import {Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent
} from "@/components/ui/chart"



// TODO generateColor only for undefined platforms
const generateColor = (index: number) => `hsl(${(index * 40) % 360}, 70%, 50%)`;

export function PlatformsChart({ platforms }: { platforms: { name: string; count: number }[] }) {
    const colorPalette = React.useMemo(() => {
        const palette: { [key: string]: string } = {};
        platforms.forEach((platform, index) => {
            palette[platform.name] = generateColor(index);
        });
        return palette;
    }, [platforms]);

    const chartData = React.useMemo(() => {
        return platforms.map((platform, index) => ({
            name: platform.name,
            count: platform.count,
            fill: colorPalette[platform.name]
        }));
    }, [platforms, colorPalette]);


    const chartConfig = React.useMemo(() => {
        const config: ChartConfig = {
            count: {
                label: "Count",
            }
        };
        platforms.forEach(platform => {
            config[platform.name] = {
                label: platform.name,
                color: colorPalette[platform.name]
            };
        });

        return config;
    }, [platforms, colorPalette]) satisfies ChartConfig;


    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Devices chart</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="name"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                        </Pie>
                        <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
