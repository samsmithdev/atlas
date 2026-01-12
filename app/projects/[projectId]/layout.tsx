// This will just be a Project navigator in the top left corner of this div
import { ReactNode } from 'react'
import { fetchProjectsForMenu, fetchProject } from '@/app/actions/projects'
import { AtlasGroupedProjectsForNav, AtlasProjectNavigatorItem } from '@/app/_types/AtlasNavigatorTypes';
import { NULL_SUBJECT_ID, NULL_SUBJECT_NAME, NULL_SUBJECT_SHORTCODE } from '@/app/_constants/uncategorized-items';
import AtlasToolbar from '@/app/_components/AtlasToolbar';

type LayoutProps = {
    children: ReactNode,
    params: { projectId?: string }
}

export default async function ProjectIdLayout({ children, params }: LayoutProps) {
    const awaitedParams = await params;

    const activeProject = awaitedParams.projectId ? (await fetchProject(awaitedParams.projectId)) ?? undefined : (undefined);

    const menuItems = (await fetchProjectsForMenu()).reduce((accumulator, project) => {
        const subjectId = project.subject?.id || NULL_SUBJECT_ID;
        const subjectName = project.subject?.name || NULL_SUBJECT_NAME;
        const subjectShortcode = project.subject?.shortcode || NULL_SUBJECT_SHORTCODE;

        if(!accumulator[subjectId]) {
            accumulator[subjectId] = {
                subjectName: subjectName,
                subjectShortcode: subjectShortcode,
                projects: [],
            }
        }

        // Create a menu item for the Project
        const menuItemProject: AtlasProjectNavigatorItem = {
            id: project.id,
            name: project.name,
            link: `/projects/${project.id}/files`
        }
        
        // Push the current menu item into the correct bucket
        accumulator[subjectId].projects.push(menuItemProject);

        return accumulator;
    }, {} as AtlasGroupedProjectsForNav);

    return (
        <div className="grid grid-rows-[auto_1fr] w-full h-full overflow-hidden" id="projectId-layout">
            <div className="flex w-full bg-gray-800 shrink" id="projects-layout-toolbar-container"> {/* This is the container that will have the Toolbar with project selector... Oh, ToolBar and page content? Duh lol */}
                <AtlasToolbar projectMenuItems={menuItems} activeProject={activeProject} />
            </div>

            <div className="flex-1 w-full overflow-hidden" id="projects-layout-children-space">
                {children}
            </div>
        </div>
    )
}