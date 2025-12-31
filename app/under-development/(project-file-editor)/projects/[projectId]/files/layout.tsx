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
    const files: AtlasNavigatorFile[] = params.projectId ? 
    (await fetchFilesForProjectFileNavigator(params.projectId)).map((file) => {
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
        <div>
            <div>
                {/* The file navigator */}
                <AtlasFileNavigator files={files} />
            </div>

            <div className="flex-1 overflow-hidden">
                {children}
            </div>
        </div>
    )
}