import { AtlasFileNavigatorItem } from "@/types/AtlasNavigatorTypes";

type AtlasSelectFileForProjectPaneProps = {
    files: AtlasFileNavigatorItem[];
    activeFileId?: string;
}

export default async function AtlasSelectFileForProjectPane({ files, activeFileId }: AtlasSelectFileForProjectPaneProps) {
    return (
        <div className="w-full h-full">
            {files ? (
                <ul className='space-y-2 grid grid-cols-1'>
                    {files.map((file) => (
                        <a
                            key={file.id}
                            href={file.link}
                            className={`p-2 rounded text-sm border-2 border-indigo-500 border-dashed border-bottom ${file.id === activeFileId
                                    ? 'bg-blue-100 text-blue-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-100'
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