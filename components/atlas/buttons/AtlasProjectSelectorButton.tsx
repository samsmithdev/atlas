'use client';

import { AtlasGroupedProjectsForNav, AtlasProjectNavigatorItem } from '@/types/AtlasNavigatorTypes';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { AtlasProjectSelectorItem } from '@/types/AtlasSelectorTypes';

export default function AtlasProjectSelectorButton({ activeProject } : {activeProject?: AtlasProjectSelectorItem }) {
    const router = useRouter();

    const triggerModal = () => {
        router.push('?action-modal=select-project')
    }

    return (
        <Button 
            variant="outline"
            onClick={() => triggerModal()}
            className='bg-slate-800 hover:bg-slate-500 text-xl p-8 border-b-2 border-indigo-500 cursor-auto hover:cursor-pointer flex-none'
        >
            {(activeProject) ? activeProject.name : "Please select a project"}
        </Button>
    )
}