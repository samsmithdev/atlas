'use client'

import { useRouter } from 'next/navigation';

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from '@/components/ui/button';
import { AtlasFormSelector } from '../AtlasActionModal';

export default function AtlasNewItemButton() {
    const router = useRouter();

    const openModal = (form: AtlasFormSelector) => {
        router.push(`?action-modal=${form}`);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="default"
                    className='rounded-none bg-slate-950 border-b-2 border-blue-700 text-2xl'
                >
                    +
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openModal(AtlasFormSelector.CreateFile)}>
                    New File
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => openModal(AtlasFormSelector.CreateProject)}>
                    New Project
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => openModal(AtlasFormSelector.CreateSubject)}>
                    New Subject
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    )
}