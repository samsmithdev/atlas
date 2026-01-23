'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export enum AtlasFormSelector {
    SelectProject = "select-project",
    CreateSubject = "create-subject",
    CreateProject = "create-project",
    CreateFile = "create-file"
}

export default function AtlasFormModal() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const formChoice = searchParams.get('action-modal');

    const closeModal = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('action-modal');
        router.push(`${pathname}?${params.toString()}`);
    }
}