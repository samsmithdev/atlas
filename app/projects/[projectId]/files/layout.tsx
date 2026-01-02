// This should have the File Navigator now
import { fetchFilesForProjectFileNavigator } from '@/app/actions/files';
import { ReactNode } from 'react';
import AtlasFileNavigator from '@/app/_components/AtlasFileNavigator';
import { AtlasNavigatorFile } from '@/app/_components/AtlasFileNavigator';
import { NULL_PROJECTID } from '@/app/_constants/uncategorized-items';

type LayoutProps = {
    children: ReactNode,
    params: { projectId?: string }
}

export default async function FileLayout({ children, params }: LayoutProps) {
    const unwrappedParams = await params;
    const files: AtlasNavigatorFile[] = unwrappedParams.projectId ? 
    (await fetchFilesForProjectFileNavigator(unwrappedParams.projectId)).map((file) => {
        const name = file.name;
        const id = file.id;
        const projectId = file.projectId ?? NULL_PROJECTID;
        const link = `/projects/${projectId}/files/${id}`

        return {
            name: name,
            id: id,
            projectId: projectId,
            link: link,
        }
    }) : 
    []

    return (
        <div className="grid grid-cols-4 w-full h-full mx-auto overflow-hidden" id="files-layout-container">
            <div className="mt-4 mb-4 ml-2 mr-2 rounded border border-white overflow-y-auto" id="files-layout-navigator-container">
                {/* The file navigator */}
                <AtlasFileNavigator files={files} />
            </div>

            <div className="flex-1 overflow-hidden col-span-3" id="files-layout-children-container">
                {children}
            </div>
        </div>
    )
}