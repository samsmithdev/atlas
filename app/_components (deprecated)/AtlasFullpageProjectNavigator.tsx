import Link from "next/link";
import { fetchProjectsForMenu } from "../actions/projects";
import { Subject } from "../generated/prisma";
import AtlasProjectPreviewPane from "./AtlasProjectPreviewPane";

export interface AtlasProjectNavigatorMenuItem {
    id: string,
    name: string,
    subject?: Subject,
    subjectId?: string,
    link: string,
}

export default async function AtlasFullpageProjectNavigator({ allProjects, previewProjectId }: {allProjects: AtlasProjectNavigatorMenuItem[], previewProjectId?: string}) {
    type GroupedProjects = Record<string, {
        subjectName: string;
        subjectShortcode: string;
        projects: typeof allProjects;
    }>;

    const menuItems = allProjects.reduce((acc, project) => {
        // Handle projects with no subject 
        const subjectId = project.subject?.id || 'uncategorized';
        const subjectName = project.subject?.name || 'Uncategorized';
        const shortCode = project.subject?.shortcode || 'MISC';

        // If we haven't seen this subject yet, create the bucket
        if(!acc[subjectId]) {
            acc[subjectId] = {
                subjectName: subjectName,
                subjectShortcode: shortCode,
                projects: []
            };
        }

        // push the current project into the correct bucket
        acc[subjectId].projects.push(project);

        return acc;
    }, {} as GroupedProjects);

    return (
        <div className="w-full h-full flex flex-row" id="atlas-fullpage-project-nav-container"> {/* the full navigator */}
            <div className="w-2/3 h-full overflow-y-auto p-6 border-r" id="atlas-fullpage-project-nav-project-container"> { /* this is the Projects navigator, it should take up 2/3 of the width and have 2 columns */}
                <div className="columns-1 xl:columns-2 gap-6 space-y-6" id="atlas-fullpage-project-nav-project-list">

                    {Object.values(menuItems).map((group) => (
                        /* The subject group */
                        <div 
                            key={group.subjectName}
                            className="break-inside-avoid mb-6 rounded-lg p-4 border border-gray-100"
                            id="atlas-fullpage-project-nav-subject-group"
                        >
                            {/* Subject Header */}
                            <div className="flex items-baseline justify-between mb-2 border-b pb-2">
                                <h3 className="font-semibold text-gray-800">
                                    <span className="text-xs font-mono uppercase">{group.subjectShortcode}</span> {group.subjectName}
                                </h3>
                            </div>

                            {/* Project Links */}
                            <ul className="space-y-2">
                                {group.projects.map((project) => (
                                    <li key={project.id}>
                                        <Link 
                                            href={project.link}
                                            className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-white hover:shadow-sm px-2 py-1 rounded transition-all"
                                        >
                                            {project.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>
            </div>

            <div className="flex-1" id="atlas-fullpage-project-navigator-preview-pane"> { /* this is the project preview pane, this div should style the sizing */ }
                <AtlasProjectPreviewPane previewProjectId={previewProjectId} openLink={`/projects/${previewProjectId}/files`}/> {/* Open /files endpoint directly from preview link*/}
            </div>
        </div>
    );
}