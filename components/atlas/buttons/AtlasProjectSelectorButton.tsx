'use client';

import { AtlasGroupedProjectsForNav, AtlasProjectNavigatorItem } from '@/types/AtlasNavigatorTypes';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { AtlasProjectSelectorItem } from '@/types/AtlasSelectorTypes';

export default function AtlasProjectSelectorButton({ projectSelectors }: { projectSelectors?: AtlasProjectSelectorItem[] }) {
    const router = useRouter();
    const params = useParams();
    const {projectId} = params;
    const activeProject = projectSelectors?.find(project => project.id === projectId)

    const triggerModal = () => {
        router.push('?action-modal=select-project');
    }

    return (
        <Button
            variant="atlas_action"
            onClick={() => triggerModal()}
            className='flex-none'
        >
            {(activeProject) ? activeProject.name : "Please select a project"}
        </Button>
    )
}