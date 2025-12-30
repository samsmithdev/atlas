import { fetchProject, fetchProjectsForMenu } from '@/app/actions/projects'
import { Project } from '../generated/prisma';
import AtlasProjectSelector from './AtlasProjectSelector';

export default async function AtlasToolbar({ activeProject }: { activeProject?: Project }) {

    return (
        <div className="w-full mt-2 mb-2 gap-4 border grid grid-flow-col"> {/* This is the "toolbar/project selector" bar */}
         <AtlasProjectSelector activeProject={activeProject} />
        </div>
    );
}