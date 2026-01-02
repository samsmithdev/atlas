import { fetchProjectsForMenu } from '@/app/actions/projects';
import { Project } from '../generated/prisma';
import AtlasProjectSelectorModal from './AtlasProjectSelectorModal';

export default async function AtlasProjectSelector({ activeProject }: { activeProject?: Project }) {
    const projects = await fetchProjectsForMenu();

    return (
        <div className="m-2 grid grid-flow-col text-xl font-bold border-b border-indigo-500 w-fit shrink"> {/* This is the project selector */}
            <div className="whitespace-nowrap shrink mr-2">
                <h2 className="shrink">{activeProject?.name ?? "Please select a project..."}</h2>
            </div>
            <AtlasProjectSelectorModal />
        </div>
    );
}
