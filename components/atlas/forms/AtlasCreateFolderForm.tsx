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

import { createFolderFormTransaction, fetchFoldersForProject } from '@/actions/folders';

type AtlasCreateFileFormProps = {
    projects: AtlasProjectSelectorItem[];
};

const initialState: ActionState = {
    message: '',
    status: 'idle',
};

export default function AtlasCreateFolderForm({ projects }: AtlasCreateFileFormProps) { 
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const [state, formAction, isPending] = useActionState(createFolderFormTransaction, initialState);

    useEffect(() => {
        if (state.status === 'success') {
            const params = new URLSearchParams(searchParams);
            params.delete('action-modal');
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, [state.status, router, pathname, searchParams]);

    return (
        <form action={formAction}
        className='space-y-4 text-blue-400 dark:bg-background dark:text-primary'>
            <div className='space-y-2 dark:bg-background dark:text-primary'>
                <Label htmlFor='projectId'>Parent Project</Label>

                <Select name='projectId' required>
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