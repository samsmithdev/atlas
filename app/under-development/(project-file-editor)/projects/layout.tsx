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
        <div className="grid grid-rows-[auto_1fr] w-full h-full" id="projects-layout-container">
            <div className="flex w-full bg-gray-800 shrink" id="projects-layout-toolbar-container"> {/* This is the container that will have the Toolbar with project selector... Oh, ToolBar and page content? Duh lol */}
                <AtlasToolbar activeProject={undefined} />
            </div>

            <div className="flex-1 h-full w-full overflow-hidden" id="projects-layout-children-space">
                {children}
            </div>
        </div>
    )
}