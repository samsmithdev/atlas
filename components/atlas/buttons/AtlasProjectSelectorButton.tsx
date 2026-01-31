'use client';

import { AtlasGroupedProjectsForNav, AtlasProjectNavigatorItem } from '@/types/AtlasNavigatorTypes';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { AtlasProjectSelectorItem } from '@/types/AtlasSelectorTypes';

export default function AtlasProjectSelectorButton({ activeProject }: { activeProject?: AtlasProjectSelectorItem }) {
    const router = useRouter();

    const triggerModal = () => {
        router.push('?action-modal=select-project')
    }

    return (
        <Button
            variant="outline"
            onClick={() => triggerModal()}
            className='bg-slate-900 rounded-none hover:bg-indigo-950 hover:text-slate-300 hover:scale-110 text-xl pb-4 pt-4 pr-4 pl-4 border-t-0 border-r-0 border-l-0 border-ro cursor-auto hover:cursor-pointer flex-none text-slate-400'
        >
            {(activeProject) ? activeProject.name : "Please select a project"}
        </Button>
    )
}