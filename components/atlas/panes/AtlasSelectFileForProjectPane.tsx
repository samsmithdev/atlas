'use client';

import { AtlasFileNavigatorItem } from "@/types/AtlasNavigatorTypes";
import { useParams } from 'next/navigation';

type AtlasSelectFileForProjectPaneProps = {
    files: AtlasFileNavigatorItem[];
}

export default function AtlasSelectFileForProjectPane({ files }: AtlasSelectFileForProjectPaneProps) {
    const params = useParams();
    const activeFileId = params.fileId as string;

    return (
        <div className="w-full h-full">
            {files ? (
                <ul className='space-y-2 grid grid-cols-1 pr-4 pl-4 h-full mb-4'>
                    {files.sort((left, right) => {
                        return left.readableId.localeCompare(right.readableId);
                    })
                        .map((file) => (
                            <a
                                key={file.id}
                                href={file.link}
                                className={`p-2 rounded text-sm border-2 border-indigo-500 border-bottom ${file.id === activeFileId
                                    ? 'bg-blue-800 text-blue-200 font-medium'
                                    : 'text-gray-400 hover:bg-gray-100'
                                    }`}
                            >
                                {file.readableId}-{file.name}
                            </a>
                        ))}
                </ul>
            ) : (<p>No files found</p>)}
        </div>
    )
}