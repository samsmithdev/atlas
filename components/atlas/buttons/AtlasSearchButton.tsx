'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function AtlasSearchButton() {
    const router = useRouter();

    const triggerModal = () => {
        router.push('?action-modal=search');
    }

    return (
        <Button 
            variant="atlas_action"
            onClick={() => triggerModal()}
            className='flex-none'
        >
            <Search className='' />
        </Button>
    )
}