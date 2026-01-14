'use client'

import AtlasFormSubject from "./AtlasFormSubject"
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export enum AtlasFormSelector {
    Subject,
    Project,
    File
}



export default function AtlasFormModal({ type }: {type: AtlasFormSelector}) {
    // Set the current active form
    // TODO: Add link argument somehow
    // TODO: Add editingEntity
    const activeForm = (type === AtlasFormSelector.Subject) ?
    (<AtlasFormSubject />) : 
    (<div>Error on form...</div>)

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const isOpen = searchParams.get('form-modal') === 'atlas-item-editor';

    const openModal = () => {
        const params = new URLSearchParams(searchParams);
        params.set('form-modal', 'atlas-item-editor');
        router.push(`${pathname}?${params.toString()}`);
    }

    const closeModal = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('form-modal')
        router.push(`${pathname}?${params.toString()}`);
    }

    const toggleModal = () => {
        const params = new URLSearchParams(searchParams);
        (isOpen) ? 
            (params.set('form-modal', 'atlas-item-editor')) :
            (params.delete('form-modal'));
            
        router.push(`${pathname}${(params.size > 0) ? (`?${params.toString()}`) : ('')}`)
    }

    return (
        <div id="atlas-form-modal">
            <button>Add New {type.toString()}</button>
            {isOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/20 backdrop-blur-[1px]"
                    onClick={toggleModal}
                >
                    {activeForm}
                </div>
            )}
        </div>
    )
}