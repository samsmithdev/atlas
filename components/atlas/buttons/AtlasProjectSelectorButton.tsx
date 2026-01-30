'use client';

import { AtlasGroupedProjectsForNav, AtlasProjectNavigatorItem } from '../../types/AtlasNavigatorTypes';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default async function AtlasProjectSelectorButton({ projectMenuItems, activeProject } : { projectMenuItems: AtlasGroupedProjectsForNav, activeProject?: AtlasProjectNavigatorItem }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();


    return (
        <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
            {(activeProject ? (activeProject.name) : ("Please select a project..."))}
        </button>
    )
}