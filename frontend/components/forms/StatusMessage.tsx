import { ReactNode } from "react";

interface StatusMessageProps {
    icon: ReactNode;
    text: string;
}

export function StatusMessage({ icon, text }: StatusMessageProps) {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-center gap-4">
                {icon}
                <h3 className="text-3xl text-center">{text}</h3>
            </div>
        </div>
    );
}