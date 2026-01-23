import { fetchProjectsForMenu } from '@/app/actions/projects';
import { Project } from '../generated/prisma';
import AtlasProjectSelectorModal from './AtlasProjectSelectorModal';
import { AtlasGroupedProjectsForNav } from '../_types/AtlasNavigatorTypes';

export default async function AtlasProjectSelector({ projectMenuItems, activeProject }: { projectMenuItems: AtlasGroupedProjectsForNav, activeProject?: Project }) {
    return (
        <div className="m-2 grid grid-flow-col text-xl font-bold border-b border-indigo-500 w-fit shrink"> {/* This is the project selector */}
            <div className="whitespace-nowrap shrink mr-2">
                <h2 className="shrink">{activeProject?.name ?? "Please select a project..."}</h2>
            </div>
            <AtlasProjectSelectorModal projectMenuItems={projectMenuItems} activeProject={activeProject}/>
        </div>
    );
}
