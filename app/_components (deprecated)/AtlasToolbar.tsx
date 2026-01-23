import { Project } from '../generated/prisma';
import AtlasProjectSelector from './AtlasProjectSelector';
import {AtlasGroupedProjectsForNav} from '@/app/_types/AtlasNavigatorTypes';

export default async function AtlasToolbar({ projectMenuItems, activeProject }: { projectMenuItems: AtlasGroupedProjectsForNav, activeProject?: Project }) {

    return (
        <div className="w-full mt-2 mb-2 gap-4 border grid grid-flow-col"> {/* This is the "toolbar/project selector" bar */}
         <AtlasProjectSelector projectMenuItems={projectMenuItems} activeProject={activeProject} />
        </div>
    );
}