export type NavigatorFile = {
    id: string;
    projectId: string;
    name: string;
};

type FileNavigatorProps = {
    files: NavigatorFile[];
    activeFileId?: string;
};

export default async function AtlasFileNavigator({ files, activeFileId }: FileNavigatorProps) {
    return (
        <div className="col-span-4 p-4 rounded mt-4 ml-0 border overflow-auto">
            <ul className='space-y-2'>
                {files.map((file) => (
                    <a 
                        key={file.id}
                        href={`/projects/${file.projectId}/files/${file.id}`}
                        className={`p-2 rounded text-sm border-2 border-indigo-500 border-dashed border-bottom ${
                            file.id === activeFileId 
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        >
                            {file.name}
                        </a>
                ))}
            </ul>
        </div>
    )
}

// export default function FileNavigator({ files, activeFileId }: FileNavigatorProps) {
//   return (
//     <nav className="flex flex-col gap-1">
//       {files.map((file) => (
//         <a 
//           key={file.id} 
//           href={`/projects/PROJECT_ID_HERE/files/${file.id}`} // We'll fix this URL part in a second
//           className={`p-2 rounded text-sm ${
//             file.id === activeFileId 
//               ? 'bg-blue-100 text-blue-700 font-medium' 
//               : 'text-gray-600 hover:bg-gray-100'
//           }`}
//         >
//           {file.name}
//         </a>
//       ))}
      
//       {files.length === 0 && (
//         <div className="text-xs text-gray-400 p-2 italic">
//           No files yet.
//         </div>
//       )}
//     </nav>
//   );
// }