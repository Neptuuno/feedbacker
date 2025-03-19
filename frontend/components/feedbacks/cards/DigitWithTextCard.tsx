import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function DigitWithTextCard({digit, text}: {digit: number, text: string}) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{text}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-full">
                <div className="text-7xl font-bold">{digit}</div>
            </CardContent>
        </Card>
    )

}