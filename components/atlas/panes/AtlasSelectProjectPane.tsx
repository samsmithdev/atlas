'use client';

import { useActionState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { AtlasGroupedProjectsForNav, AtlasProjectLinkSubjectGroup } from '@/types/AtlasNavigatorTypes';

type SelectProjectPaneProps = {
    projectsGroupedBySubject: AtlasProjectLinkSubjectGroup[];
    activeProjectId?: string;
}

export default function AtlasSelectProjectPane({ projectsGroupedBySubject, activeProjectId }: SelectProjectPaneProps) {

    return (
        <div className="w-full h-full overflow-y-auto p-6 border-r columns-1 xl:columns-2 gap-6 space-y-6" id="atlas-select-project-pane-container">
            {projectsGroupedBySubject.map((subjectGroup) => {
                return (
                    <div id="atlas-select-project-pane_subject-group">
                        <h3 className="font-semibold text-gray-800">{subjectGroup.subjectShortcode}</h3>
                    </div>
                )
            })}
        </div>
    )
}