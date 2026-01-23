'use client'

import { AtlasGroupedProjectsForNav } from '@/types/AtlasNavigatorTypes';
import { Project } from '@/app/generated/prisma';
import Link from 'next/link';
import { useState } from 'react'; // replacing
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import AtlasFormModal, { AtlasFormSelector } from './AtlasFormModal';

export default function AtlasProjectSelectorModal({ projectMenuItems, activeProject }: { projectMenuItems: AtlasGroupedProjectsForNav, activeProject?: Project }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const isOpen = searchParams.get('modal') === 'project-selector';
    
    const openModal = () => {
        const params = new URLSearchParams(searchParams);
        params.set('modal', 'project-selector');
        router.push(`${pathname}?${params.toString()}`);
    }

    const closeModal = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('modal');
        router.push(pathname);
    }

    return (
        <div>
            <button
                onClick={openModal}
                className="w-fit ml-2 mr-2 p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Select Project"
                aria-expanded={isOpen}
            >
                <svg
                    className={`w-6 h-6 text-gray-800 dark:text-white shrink transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="m19 9-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/20 backdrop-blur-[1px]"
                    onClick={closeModal}
                >
                    <div className="flex justify-between items-center mb-4 border-b border-slate-100 dark:border-slate-800 pb-2"
                    onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">
                            Go to Project..
                        </h3>
                        <button
                            onClick={closeModal}
                            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded"
                        >
                            ESC
                        </button>
                    </div>

                    <div className="h-64 flex items-center justify-center text-slate-400 italic bg-slate-50 dark:bg-slate-950/50 rounded border border-dashed border-slate-300 dark:border-slate-700 columns-1 xl:columns-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {Object.values(projectMenuItems).map((group => (
                            /* The subject group */
                            <div 
                                key={group.subjectName}
                                className="break-inside-avoid mb-6 rounded-lg p-4 border border-gray-100"
                                id="atlas-project-selector-modal-subject-group"
                            >
                                {/* The subject header */}
                                <div className="flex items-baseline justify-between mb-2 border-b pb-2">
                                    <h3 className="font-semibold text-gray-800">
                                        <span className="text-xs font-mono uppercase">{group.subjectShortcode}</span> {group.subjectName}
                                    </h3>
                                </div>

                                {/* Project Links */}
                                <ul className='space-y-2'>
                                    {group.projects.map((project) => (
                                        <li key={project.id}>
                                            <Link
                                                href={project.link}
                                                className='block text-sm text-gray-600 hover:text-blue-600 hover:bg-white hover:shadow-sm px-2 py-1 rounded transition-all'
                                            >
                                                {project.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )))}
                    </div>

                    <div className="mt-4 pt-2 flex justify-end"
                    onClick={(e) => e.stopPropagation()}
                    >
                        {/* A placeholder for that "Create" button we talked about */}
                        <AtlasFormModal type={AtlasFormSelector.Subject} />
                    </div>
                </div>
            )}
        </div>
    )
}