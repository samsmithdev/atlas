'use client';

import { Button } from '@/components/ui/button';
import { loadDemonstrationData } from '@/actions/demo';

export default function AtlasDemoDataButton() {
    return (
        <Button variant='atlas_action' onClick={() => loadDemonstrationData}></Button>
    )
}