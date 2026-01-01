export type AtlasNavigatorFile = {
    id: string;
    projectId: string;
    name: string;
    link: string;
};

type AtlasFileNavigatorProps = {
    files: AtlasNavigatorFile[];
    activeFileId?: string;
};

export default async function AtlasFileNavigator({ files, activeFileId }: AtlasFileNavigatorProps) {
    return (
        <div className="col-span-4 p-4 rounded mt-4 ml-0 border h-full overflow-auto">
            {files ? (<ul className='space-y-2 grid grid-cols-1 h-full overflow-auto'>
                {files.map((file) => (
                    <a 
                        key={file.id}
                        href={file.link}
                        className={`p-2 rounded text-sm border-2 border-indigo-500 border-dashed border-bottom ${
                            file.id === activeFileId 
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        >
                            {file.name}
                        </a>
                ))}
            </ul>) : (<p>No files found</p>) }
            
        </div>
    )
}