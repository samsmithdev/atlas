'use client';

import { useActionState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { AtlasGroupedProjectsForNav } from '@/types/AtlasNavigatorTypes';
import Link from 'next/link';

type SelectProjectPaneProps = {
    projectsGroupedBySubject: AtlasGroupedProjectsForNav;
    activeProjectId?: string;
}

export default function AtlasSelectProjectPane({ projectsGroupedBySubject, activeProjectId }: SelectProjectPaneProps) {

    return (
        <div className="w-full h-full overflow-y-auto p-6 border-r columns-1 xl:columns-2 gap-6 space-y-6" id="atlas-select-project-pane-container">
            {Object.values(projectsGroupedBySubject).sort((left, right) => {
                return ('' + left.subjectShortcode).localeCompare(right.subjectShortcode);
            }).map((subjectGroup) => (
                <div 
                    key={subjectGroup.subjectName}
                    className="break-inside-avoid mb-6 rounded-lg p-4 border border-gray-100"
                    id="atlas-select-project-pane_subject-group-container"
                >
                    <div className="flex items-baseline justify-between mb-2 border-b pb-2">
                        <h3 className="font-semibold text-gray-800">
                            <span className="text-xs font-mono uppercase">{subjectGroup.subjectShortcode}</span> {subjectGroup.subjectName}
                        </h3>
                    </div>

                    <ul className="space-y-2">
                        {subjectGroup.projects.map((project) => (
                            <li key={project.id}>
                                <Link 
                                    href={project.link}
                                    className="block text-sm text-gray-600"
                                >
                                    {project.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}