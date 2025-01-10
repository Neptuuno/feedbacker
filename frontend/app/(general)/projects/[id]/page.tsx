import {Project} from "@/lib/Entities/Project";
import {fetchWrapper} from "@/lib/fetchwrapper";
import Image from "next/image";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {Separator} from "@/components/ui/separator";


async function getData(params: { id: number }): Promise<Project> {
    const url = `${process.env.API_URL}/projects/${(params).id}`;
    return await fetchWrapper(url);
}

export default async function ProjectDetail(
    props: {
        params: Promise<{ id: number }>
    }
) {
    const params = await props.params;
    const project: Project = await getData(params);

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <Card className="w-64">
                        <CardHeader>
                            <CardTitle className="text-4xl">{project.name}</CardTitle>
                            <CardDescription className="text-xl">{project.description}</CardDescription>
                        </CardHeader>
                    </Card>
                    <Menubar className="my-4">
                        <MenubarMenu>
                            <MenubarTrigger>File</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    New Window <MenubarShortcut>⌘N</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem disabled>New Incognito Window</MenubarItem>
                                <MenubarSeparator/>
                                <MenubarSub>
                                    <MenubarSubTrigger>Share</MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem>Email link</MenubarItem>
                                        <MenubarItem>Messages</MenubarItem>
                                        <MenubarItem>Notes</MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarSeparator/>
                                <MenubarItem>
                                    Print... <MenubarShortcut>⌘P</MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>Edit</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                                </MenubarItem>
                                <MenubarSeparator/>
                                <MenubarSub>
                                    <MenubarSubTrigger>Find</MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem>Search the web</MenubarItem>
                                        <MenubarSeparator/>
                                        <MenubarItem>Find...</MenubarItem>
                                        <MenubarItem>Find Next</MenubarItem>
                                        <MenubarItem>Find Previous</MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarSeparator/>
                                <MenubarItem>Cut</MenubarItem>
                                <MenubarItem>Copy</MenubarItem>
                                <MenubarItem>Paste</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>View</MenubarTrigger>
                            <MenubarContent>
                                <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
                                <MenubarCheckboxItem checked>
                                    Always Show Full URLs
                                </MenubarCheckboxItem>
                                <MenubarSeparator/>
                                <MenubarItem inset>
                                    Reload <MenubarShortcut>⌘R</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem disabled inset>
                                    Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                                </MenubarItem>
                                <MenubarSeparator/>
                                <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                                <MenubarSeparator/>
                                <MenubarItem inset>Hide Sidebar</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>Profiles</MenubarTrigger>
                            <MenubarContent>
                                <MenubarRadioGroup value="benoit">
                                    <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                                    <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                                    <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                                </MenubarRadioGroup>
                                <MenubarSeparator/>
                                <MenubarItem inset>Edit...</MenubarItem>
                                <MenubarSeparator/>
                                <MenubarItem inset>Add Profile...</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
                {project.imagePath &&
                    <Card className="w-64">
                        <CardContent className="p-3">
                            <Image className="rounded-xl"
                                   src={`${process.env.API_URL}/${project.imagePath}`}
                                   alt="project image"
                                   width={500} height={500}/>
                        </CardContent>
                    </Card>}
            </div>
            <Separator className="my-8"/>
        </div>
    )
}