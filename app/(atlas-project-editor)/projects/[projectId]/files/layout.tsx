import { fetchFileNavItemsForProject } from "@/actions/files";
import { fetchProjectSelector } from "@/actions/projects";
import AtlasProjectToolbar from "@/components/atlas/AtlasProjectToolbar";
import AtlasProjectSelectorButton from "@/components/atlas/buttons/AtlasProjectSelectorButton";
import AtlasSelectFileForProjectPane from "@/components/atlas/panes/AtlasSelectFileForProjectPane";
import { AtlasFileNavigatorItem } from "@/types/AtlasNavigatorTypes";

// Defined at /projects/[projectId]/files/layout.tsx

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ projectId: string, fileId?: string }>;
}

export default async function AtlasFilesLayout({
    children, params
}: LayoutProps) {
    const { projectId, fileId } = await params;
    const fileNavigatorItems: AtlasFileNavigatorItem[] = (await fetchFileNavItemsForProject(projectId)).map((file) => {
        const newFile = {
            id: file.id,
            readableId: file.readableId,
            name: file.name,
            link: `/projects/${projectId}/files/${file.id}`
        }

        return newFile;
    });

    return (
        <div className="w-full h-full flex flex-row gap-8" id='atlas-files-layout_container'>
            <div className="w-1/4 overflow-y-auto mb-8 mt-8 scroll-h" id='atlas-files-layout_select-file-container'>
                <AtlasSelectFileForProjectPane files={fileNavigatorItems} />
            </div>
            <div className="flex-1 ml-4 mr-8" id='atlas-files-layout_content'>{children}</div>
        </div>
    )
}