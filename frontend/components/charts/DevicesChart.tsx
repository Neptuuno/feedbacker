"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

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
} from "@/components/ui/chart"


const colorPalette: { [key: string]: string } = {
    "phone": "hsl(var(--chart-1))",
    "desktop": "hsl(var(--chart-2))",
    "Unknown": "hsl(var(--chart-3))",
};

export function DevicesChart({ devices }: { devices: { name: string; count: number }[] }) {
    const chartData = React.useMemo(() => {
        return devices.map(device => ({
            name: device.name,
            count: device.count,
            fill: colorPalette[device.name] || "hsl(var(--chart-4))"
        }));
    }, [devices]);

    const chartConfig = React.useMemo(() => {
        const config: ChartConfig = {
            count: {
                label: "Count",
            }
        };
        devices.forEach(device => {
            config[device.name] = {
                label: device.name,
                color: colorPalette[device.name] || "hsl(var(--chart-4))"
            };
        });

        return config;
    }, [devices]) satisfies ChartConfig;

    console.log(chartConfig)

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
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
