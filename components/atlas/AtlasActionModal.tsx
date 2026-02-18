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
import AtlasCreateSubjectForm from './forms/AtlasCreateSubjectForm';
import AtlasCreateProjectForm from './forms/AtlasCreateProjectForm';
import AtlasCreateFileForm from './forms/AtlasCreateFileForm';

// Type Imports
import { AtlasSubjectSelectorItem, AtlasProjectSelectorItem } from '@/types/AtlasSelectorTypes';
import { AtlasProjectNavigatorItem, AtlasGroupedProjectsForNav, AtlasNavigationItem } from '@/types/AtlasNavigatorTypes';
import AtlasSelectProjectPane from './panes/AtlasSelectProjectPane';
import AtlasSearchPane from './panes/AtlasSearchPane';
import AtlasCreateFolderForm from './forms/AtlasCreateFolderForm';
import { AtlasUploadPane } from './panes/AtlasUploadPane';

export enum AtlasFormSelector {
    Search = "search",
    SelectProject = "select-project",
    CreateSubject = "create-subject",
    CreateProject = "create-project",
    CreateFolder = "create-folder",
    CreateFile = "create-file"
}

type AtlasActionModalProps = {
    projects: AtlasProjectSelectorItem[];
    subjects: AtlasSubjectSelectorItem[];
    projectLinkSubjectGroup: AtlasGroupedProjectsForNav;
}

export default function AtlasActionModal({ subjects, projects, projectLinkSubjectGroup }: AtlasActionModalProps) {
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
                        <AtlasSelectProjectPane projectsGroupedBySubject={projectLinkSubjectGroup} />
                    </>
                );

            case AtlasFormSelector.CreateSubject:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>New Subject</DialogTitle>
                            <DialogDescription>Create a new top-level category for Projects.</DialogDescription>
                        </DialogHeader>
                        <AtlasCreateSubjectForm />
                    </>
                );

            case AtlasFormSelector.CreateProject:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>New Project</DialogTitle>
                            <DialogDescription>Create a new Project.</DialogDescription>
                        </DialogHeader>
                        <AtlasCreateProjectForm subjects={subjects} />
                    </>
                );

            case AtlasFormSelector.CreateFile:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>New File</DialogTitle>
                            <DialogDescription>Create a new File.</DialogDescription>
                        </DialogHeader>
                        <AtlasCreateFileForm projects={projects} />
                    </>
                );

            case AtlasFormSelector.CreateFolder:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>New Folder</DialogTitle>
                            <DialogDescription>Create a new Folder.</DialogDescription>
                        </DialogHeader>
                        <AtlasCreateFolderForm projects={projects} />
                    </>
                );

            case AtlasFormSelector.Search:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Search...</DialogTitle>
                        </DialogHeader>
                        <AtlasUploadPane 
                            projectId='cmllew0fn0003icnkvtue5ujj' 
                onUploadComplete={(asset) => {
                        closeModal(); // Close modal
                            router.refresh(); // Refresh list
                        }}
                        />
                    </>
                );

            default:
                return (
                    <div>Unknown Action</div>
                );
        }
    }

    return (
        <div className="bg-background text-foreground antialiased" id='atlas-action-modal-container'>
            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-[425px]">{formChoice && renderForm()}</DialogContent>
            </Dialog>
        </div>
    );
}