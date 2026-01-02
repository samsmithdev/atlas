'use client'

import { useState } from 'react'

export default function AtlasProjectSelectorModal() {
    const [isOpen, setIsOpen] = useState(false);

    const close = () => setIsOpen(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
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
                    onClick={() => setIsOpen(false)}
                >
                    <div className="flex justify-between items-center mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                        <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">
                            Go to Project..
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded"
                        >
                            ESC
                        </button>
                    </div>

                    <div className="h-64 flex items-center justify-center text-slate-400 italic bg-slate-50 dark:bg-slate-950/50 rounded border border-dashed border-slate-300 dark:border-slate-700">
                        Project List Loading...
                    </div>

                    <div className="mt-4 pt-2 flex justify-end">
                        {/* A placeholder for that "Create" button we talked about */}
                        <button className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition shadow-sm">
                            + New Project
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}