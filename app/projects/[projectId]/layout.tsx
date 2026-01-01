// This will just be a Project navigator in the top left corner of this div
import { ReactNode } from 'react'
import { fetchAllProjects, fetchProject } from '@/app/actions/projects'
import AtlasToolbar from '@/app/_components/AtlasToolbar';

type LayoutProps = {
    children: ReactNode,
    params: { projectId?: string }
}

export default async function ProjectIdLayout({ children, params }: LayoutProps) {
    const awaitedParams = await params;

    const activeProject = awaitedParams.projectId ? (await fetchProject(awaitedParams.projectId)) ?? undefined : (undefined);

    return (
        <div className="grid grid-rows-[auto_1fr] w-full h-full overflow-hidden" id="projectId-layout">
            <div className="flex w-full bg-gray-800 shrink" id="projects-layout-toolbar-container"> {/* This is the container that will have the Toolbar with project selector... Oh, ToolBar and page content? Duh lol */}
                <AtlasToolbar activeProject={activeProject} />
            </div>

            <div className="flex-1 w-full overflow-hidden" id="projects-layout-children-space">
                {children}
            </div>
        </div>
    )
}