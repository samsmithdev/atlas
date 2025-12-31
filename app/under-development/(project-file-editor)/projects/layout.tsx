// This will just be a Project navigator in the top left corner of this div
import { ReactNode } from 'react'
import { fetchAllProjects } from '@/app/actions/projects'
import AtlasToolbar from '@/app/_components/AtlasToolbar';

type LayoutProps = {
    children: ReactNode,
    params: { projectId?: string }
}

export default async function ProjectLayout({ children, params }: LayoutProps) {
    return (
        <div className="grid grid-rows-12 w-full h-full">
            <div className="flex w-full bg-gray-800 shrink"> {/* This is the container that will have the Toolbar with project selector... Oh, ToolBar and page content? Duh lol */}
                <AtlasToolbar activeProject={undefined} />
            </div>

            <div className="flex-1 overflow-hidden row-span-11">
                {children}
            </div>
        </div>
    )
}