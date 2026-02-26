'use client';

// React and NextJS
import { useOptimistic, startTransition } from 'react';
import { useParams } from 'next/navigation';

// Shadcn
import { ScrollArea } from '@/components/ui/scroll-area';

import { AtlasFileListItem, AtlasFileListType } from '@/types/AtlasListTypes';
import { deleteFile } from '@/actions/files';
import { deleteFolder } from '@/actions/folders';
import AtlasListItemCard from '../cards/AtlasListItemCard';
import AtlasListFolderCollapsible from '../collapsibles/AtlasListFolderCollapsible';

interface AtlasSelectFileForProjectPanelProps {
    fileList: AtlasFileListItem[];
}

export default async function AtlasSelectFileForProjectPanel({ fileList }: AtlasSelectFileForProjectPanelProps) {
    const params = useParams();
    const activeFileId = params.fileId as string;

    const [optimisticFileList, removeOptimisticFileOrFolder] = useOptimistic(
        fileList,
        (currentFileList, idToRemove: string) => {
            return currentFileList.filter(fileItem => fileItem.id !== idToRemove);
        }
    );

    const handleDeleteRequest = async (itemId: string) => {
        startTransition(() => {
            removeOptimisticFileOrFolder(itemId);
        });

        const itemIndex = fileList.findIndex(item => item.id === itemId);
        const itemType = fileList[itemIndex].type;

        const result = (itemType === AtlasFileListType.File) ? await deleteFile(itemId) : await deleteFolder(itemId);

        if (!result.success) {
            console.error("Failed to delete");
        }
    }

    return (
        <div className='w-full h-full'>
            {(optimisticFileList && optimisticFileList.length > 0) ?
            (<ScrollArea className=''>
                <ul className='space-y-2 flex flex-col pr-4 pl-4 mb-4'>
                    {optimisticFileList.map((fileListItem) => (
                        (fileListItem.type === AtlasFileListType.File) ? (
                            <AtlasListItemCard displayText={fileListItem.name} itemId={fileListItem.id} onDelete={handleDeleteRequest} href={fileListItem.link ?? ''} />
                        ) : (<AtlasListFolderCollapsible folderName={fileListItem.name} folderId={fileListItem.id} folderItems={fileListItem.subitems?.map((file) => { 
                            return {displayText: file.name, itemId: file.id, link: file.link ?? ''}
                        }) ?? []} onDelete={handleDeleteRequest} />)
                    ))}
                </ul>
            </ScrollArea>) : 
            (<p></p>)}
        </div>
    );
}