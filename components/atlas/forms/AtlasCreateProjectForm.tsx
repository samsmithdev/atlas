// REMEMBER: Accept subjects[] and currentSubjectId?
'use client';

// React and NextJS Imports
import { useActionState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// ATLAS Imports
import { createProjectFormTransaction, ActionState } from '@/actions/projects';

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

type SubjectSelectorItem = {
    id: string;
    shortcode: string;
    name: string;
}

type CreateProjectformProps = {
    subjects: SubjectSelectorItem[];
    activeSubjectId?: string;
}

const initialState: ActionState = {
    message: '',
    status: 'idle',
};

export default function AtlasCreateProjectForm({ subjects, activeSubjectId }: CreateProjectformProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [state, formAction, isPending] = useActionState(createProjectFormTransaction, initialState);

    // Effect: Close modal on success
    useEffect(() => {
        if (state.status === 'success') {
            const params = new URLSearchParams(searchParams);
            params.delete('action-modal');
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, [state.status, router, pathname, searchParams]);

    return (
        <form action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="subjectId">Parent Subject</Label>

                <Select name="subjectId" required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a Subject" />
                    </SelectTrigger>

                    <SelectContent>
                        {subjects.map((subject)=> (
                            <SelectItem key={subject.id} value={subject.id}>
                                {subject.shortcode} - {subject.name}
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
                    placeholder='e.g. Kitchen Timer Voice Assistant'
                    required
                />
            </div>

            <div className='grid gap-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea 
                    id='description'
                    name='description'
                    placeholder="What is the project about?"
                />
            </div>

            {state.status === 'error' && (
                <p className='text-sm text-red-500'>{state.message}</p>
            )}

            <div className='flex justify-end'>
                <Button type='submit' disabled={isPending}>
                    {isPending ? 'Saving...' : 'Create Project'}
                </Button>
            </div>
        </form>
    )
}