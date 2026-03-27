'use client';

// React and NextJS Imports
import { useActionState, useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// ATLAS Imports
import { createFileFormTransaction, ActionState } from '@/actions/files';
import { AtlasProjectSelectorItem } from '@/types/AtlasSelectorTypes';

// Shadcn UI Imports
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

import { fetchFoldersForProject } from '@/actions/folders';

type AtlasCreateFileFormProps = {
    projects: AtlasProjectSelectorItem[];
};

const initialState: ActionState = {
    message: '',
    status: 'idle',
};

export default function AtlasCreateFileForm({ projects }: AtlasCreateFileFormProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [projectFolders, setProjectFolders] = useState(Array<{ id: string; name: string; projectId: string; }>);
    const [isLoadingFolders, setIsLoadingFolders] = useState(false);

    const [state, formAction, isPending] = useActionState(createFileFormTransaction, initialState);

    // Effect: Close modal on success
    useEffect(() => {
        if (state.status === 'success') {
            const params = new URLSearchParams(searchParams);
            params.delete('action-modal');
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, [state.status, router, pathname, searchParams]);

    useEffect(() => {
        setProjectFolders([]);

        if (!selectedProjectId) return;

        let isActive = true;

        const loadFolders = async () => {
            setIsLoadingFolders(true);

            try {
                const folders = await fetchFoldersForProject(selectedProjectId);

                if (isActive && folders) {
                    setProjectFolders(folders);
                }
            } catch (error) {

            } finally {
                if (isActive) setIsLoadingFolders(false);
            }
        };

        loadFolders();

        // 3. The Cleanup Function
        return () => {
            isActive = false;
        };
    }, [selectedProjectId]);

    return (
        <form action={formAction} className='space-y-4 text-blue-400 dark:bg-background dark:text-primary'>
            <div className='space-y-2 dark:bg-background dark:text-primary'>
                <Label htmlFor='projectId'>Parent Project</Label>

                <Select name="projectId" required value={selectedProjectId} onValueChange={setSelectedProjectId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a Project" />
                    </SelectTrigger>

                    <SelectContent>
                        {projects.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                                {project.readableId} {project.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className='space-y-2 dark:bg-background dark:text-primary'>
                <Label htmlFor='folderId'>Folder</Label>
                
                <Select name='folderId'>
                    <SelectTrigger>
                        <SelectValue placeholder='Select a Folder?' />
                    </SelectTrigger>

                    {projectFolders && 
                        (<SelectContent>
                            {projectFolders.map((projectFolder) => (
                                <SelectItem key={projectFolder.id} value={projectFolder.id}>
                                    {projectFolder.name}
                                </SelectItem>
                            ))}
                        </SelectContent>)
                    }
                </Select>
            </div>

            <div className='grid gap-2'>
                <Label htmlFor='name'>Name</Label>

                <Input
                    id='name'
                    name='name'
                    className='scheme-dark'
                    placeholder='e.g. Project Overview'
                    required
                />
            </div>

            <div className='grid gap-2 text-indigo-400'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                    id='description'
                    name='description'
                    placeholder='What is the file about?'
                />
            </div>

            {state.status === 'error' && (
                <p className='text-sm text-red-500'>{state.message}</p>
            )}

            <div className='flex justify-end'>
                <Button type='submit' disabled={isPending}>
                    {isPending ? 'Saving...' : 'Create File'}
                </Button>
            </div>
        </form>
    )
}