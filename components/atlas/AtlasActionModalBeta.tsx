'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { DecimalsArrowRightIcon } from 'lucide-react';

export enum AtlasFormSelector {
    SelectProject = "select-project",
    CreateSubject = "create-subject",
    CreateProject = "create-project",
    CreateFile = "create-file"
}

export default function AtlasActionModal() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const formChoice = searchParams.get('action-modal');

    const isOpen = !!formChoice;

    const closeModal = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('action-modal');
        router.replace(`${pathname}?${params.toString()}`);
    }

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            closeModal();
        }
    };

    const renderForm = () => {
        switch (formChoice) {
            case AtlasFormSelector.SelectProject:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Open Project</DialogTitle>
                            <DialogDescription>Select a project to open.</DialogDescription>
                        </DialogHeader>
                        <div className="p-4 border rounded-md bg-muted/50">Project Selector Component Goes Here</div>
                    </>
                );

            case AtlasFormSelector.CreateSubject:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>New Subject</DialogTitle>
                            <DialogDescription>Create a new top-level category for Projects.</DialogDescription>
                        </DialogHeader>
                        <div className="p-4 border rounded-md bg-muted/50">Create Subject Form Goes Here</div>
                    </>
                );

            case AtlasFormSelector.CreateProject:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>New Project</DialogTitle>
                            <DialogDescription>Create a new Project.</DialogDescription>
                        </DialogHeader>
                        <div className="p-4 bourder rounded-md bg-muted/50">Create Project Form Goes Here</div>
                    </>
                );

            case AtlasFormSelector.CreateFile:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>New File</DialogTitle>
                            <DialogDescription>Create a new File.</DialogDescription>
                        </DialogHeader>
                        <div className="p-4 border rounded-md bg-muted/50">Create File Form Goes Here</div>
                    </>
                );

            default:
                return (
                    <div>Unknown Action</div>
                );
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">{formChoice && renderForm()}</DialogContent>
        </Dialog>
    )
}