'use client';

// React and NextJS Imports
import { useActionState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// ATLAS Imports
import { createSubjectTransaction, ActionState } from '@/actions/subjects';

// Shadcn UI Imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const initialState: ActionState = {
    message: '',
    status: 'idle',
};

export default function AtlasCreateSubjectForm() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // state is return value from server action, formAction will be attached to <form> tag
    const [state, formAction, isPending] = useActionState(createSubjectTransaction, initialState);

    // Effect: Close modal on success
    useEffect(() => {
        if (state.status === 'success') {
            const params = new URLSearchParams(searchParams);
            params.delete('action-modal');
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, [state.status, router, pathname, searchParams]);

    return (
        <form action={formAction} className="grid gap-4 py-4 scheme-dark">
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                    id="name"
                    name="name"
                    placeholder="e.g. Computer Science"
                    required
                />
            </div>

            <div className='grid gap-2'>
                <Label htmlFor="shortcode">Shortcode</Label>
                <Input 
                    id="shortcode"
                    name="shortcode"
                    placeholder="e.g. CS"
                    required
                />
            </div>

            <div className='grid gap-2'>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                    id="description"
                    name="description"
                    placeholder="What is this subject about?"
                />
            </div>

            {state.status === 'error' && (
                <p className="text-sm text-red-500">{state.message}</p>
            )}

            <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Saving...' : 'Create Subject'}
                </Button>
            </div>
        </form>
    );
}