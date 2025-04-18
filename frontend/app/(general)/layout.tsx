import type {Metadata} from "next";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
    title: "Feedbacker",
};

export default function GeneralLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar/>
            <div className="flex flex-col">
                <Header/>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
