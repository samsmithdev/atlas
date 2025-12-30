import { fetchProjectsForMenu } from '@/app/actions/projects';
import { Project } from '../generated/prisma';

export default async function AtlasProjectSelector({ activeProject }: { activeProject?: Project }) {
    const projects = await fetchProjectsForMenu();

    return (
        <div className="m-2 grid grid-flow-col text-xl font-bold border-b border-indigo-500 w-fit shrink"> {/* This is the project selector */}
            <div className="whitespace-nowrap shrink mr-2">
                <h2 className="shrink">{activeProject?.name ?? "Please select a project..."}</h2>
            </div>
            <div className="w-fit ml-2 mr-2">
                <svg className="w-6 h-6 text-gray-800 dark:text-white shrink" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
}
