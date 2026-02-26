import { fetchFileNavItemsForProject } from "@/actions/files";
import { fetchProjectSelector } from "@/actions/projects";
import AtlasProjectToolbar from "@/components/atlas/AtlasProjectToolbar";
import AtlasProjectSelectorButton from "@/components/atlas/buttons/AtlasProjectSelectorButton";
import { AtlasFileNavigatorItem } from "@/types/AtlasNavigatorTypes";
import {AtlasFileListItem, AtlasFileListItemRecord, AtlasFileListType } from '@/types/AtlasListTypes'
import AtlasSelectFileForProjectPanel from "@/components/atlas/panels/AtlasSelectFileForProjectPanel";

// Defined at /projects/[projectId]/files/layout.tsx

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ projectId: string, fileId?: string }>;
}

export default async function AtlasFilesLayout({
    children, params
}: LayoutProps) {
    const { projectId } = await params;
    // const fileNavigatorItems: AtlasFileNavigatorItem[] = (await fetchFileNavItemsForProject(projectId)).map((file) => {
    //     const newFile = {
    //         id: file.id,
    //         readableId: file.readableId,
    //         name: file.name,
    //         link: `/projects/${projectId}/files/${file.id}`,
    //         folderId: file.folderId ?? undefined,
    //         folderName: file.folder?.name ?? undefined
    //     }

    //     return newFile;
    // });

    const fetchedFiles = await fetchFileNavItemsForProject(projectId);

    const fileListItemsRecord: AtlasFileListItemRecord = fetchedFiles.reduce((accumulator, file) => {
        const newFileItem: AtlasFileListItem = {
            id: file.id,
            name: file.name,
            type: AtlasFileListType.File,
            link: `/projects/${projectId}/files/${file.id}`
        };

        // Check if it exists in a folder
        if (file.folderId) {
            // Check if folder exists
            if (accumulator[file.folderId]) {
                if (accumulator[file.folderId].subitems) {
                    // forcing unwrapping subitems, why would it not exist inside of this check??
                    accumulator[file.folderId].subitems!.push(newFileItem);
                } else {
                    accumulator[file.folderId].subitems = [newFileItem];
                }
            } else {
                const newFolderItem: AtlasFileListItem = {
                    id: file.folderId,
                    name: file.folder?.name ?? '',
                    type: AtlasFileListType.Folder,
                    subitems: [newFileItem]
                };

                accumulator[newFolderItem.id] = newFolderItem;
            }
        } else {
            // If not, add to list directly
            accumulator[newFileItem.id] = newFileItem;
        }

        return accumulator;
    }, {} as AtlasFileListItemRecord)

    return (
        <div className="w-full h-full flex flex-row gap-8" id='atlas-files-layout_container'>
            <div className="w-1/4 overflow-y-auto mb-8 mt-8 scroll-h" id='atlas-files-layout_select-file-container'>
                <AtlasSelectFileForProjectPanel fileList={Object.values(fileListItemsRecord)} />
            </div>
            <div className="flex-1 ml-4 mr-8" id='atlas-files-layout_content'>{children}</div>
        </div>
    )
}