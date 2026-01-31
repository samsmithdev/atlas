'use client';

import { useActionState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { AtlasGroupedProjectsForNav } from '@/types/AtlasNavigatorTypes';
import AtlasEmptySelectProjectPane from './empty-states/AtlasEmptySelectProjectPane';
import Link from 'next/link';

type SelectProjectPaneProps = {
    projectsGroupedBySubject: AtlasGroupedProjectsForNav;
    activeProjectId?: string;
}

export default function AtlasSelectProjectPane({ projectsGroupedBySubject, activeProjectId }: SelectProjectPaneProps) {

    return (
        <div className="w-full h-full overflow-y-auto p-6 border-r columns-1 xl:columns-2 gap-6 space-y-6" id="atlas-select-project-pane-container">
            {(Object.values(projectsGroupedBySubject).length > 0) ? (Object.values(projectsGroupedBySubject).sort((left, right) => {
                return ('' + left.subjectShortcode).localeCompare(right.subjectShortcode);
            }).map((subjectGroup) => (
                <div
                    key={subjectGroup.subjectName}
                    className="break-inside-avoid mb-6 p-4 border border-indigo-500"
                    id="atlas-select-project-pane_subject-group-container"
                >
                    <div className="flex items-baseline justify-between mb-2 border-b pb-2 border-indigo-700">
                        <h3 className="font-semibold text-gray-100">
                            <span className="font-bold uppercase">{subjectGroup.subjectShortcode}</span> {subjectGroup.subjectName}
                        </h3>
                    </div>

                    <ul className="">
                        {subjectGroup.projects.map((project) => (
                            <li key={project.id}>
                                <Link
                                    href={project.link}
                                    className="block text-sm text-gray-200 hover:bg-indigo-950 cursor-auto hover:cursor-pointer p-2 shrink"
                                >
                                    {project.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))) : ((<AtlasEmptySelectProjectPane />))} 
        </div>
    )
}