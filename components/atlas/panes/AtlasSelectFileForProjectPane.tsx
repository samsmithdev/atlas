'use client';

import { useOptimistic, startTransition } from 'react';
import { AtlasFileNavigatorItem, AtlasGroupedFilesForNav, AtlasNavigationTypes } from "@/types/AtlasNavigatorTypes";
import AtlasEmptySelectFileForProjectPane from "./empty-states/AtlasEmptySelectFileForProjectPane";
import { useParams } from 'next/navigation';
import AtlasItemButton from "../buttons/AtlasItemButton";
import { deleteFile } from '@/actions/files';

type AtlasSelectFileForProjectPaneProps = {
    files: AtlasFileNavigatorItem[];
}

export default function AtlasSelectFileForProjectPane({ files }: AtlasSelectFileForProjectPaneProps) {
    const params = useParams();
    const activeFileId = params.fileId as string;

    const [optimisticFiles, removeOptimisticFile] = useOptimistic(
        files,
        (currentFiles, fileIdToRemove: string) => {
            return currentFiles.filter(file => file.id !== fileIdToRemove);
        }
    );

    const handleDeleteRequest = async (fileId: string) => {
        startTransition(() => {
            removeOptimisticFile(fileId);
        })

        const result = await deleteFile(fileId);

        if (!result.success) {
            console.error("Failed to delete");
        }
    }

    return (
        <div className="w-full h-full">
            {(optimisticFiles && optimisticFiles.length > 0) ? (
                <ul className='space-y-2 flex flex-col pr-4 pl-4 h-full mb-4'>
                    {Object.values(optimisticFiles.sort((left, right) => {
                        return left.readableId.localeCompare(right.readableId);
                    }).reduce((accumulator, fileNavItem) => {
                        const folderId = fileNavItem.folderId ?? 'root';
                        const folderName = fileNavItem.folderName;
                        
                        if (!accumulator[folderId]) {
                            accumulator[folderId] = {
                                folderName,
                                folderId,
                                files: []
                            };
                        }

                        accumulator[folderId].files.push(fileNavItem);

                        return accumulator;
                    }, {} as AtlasGroupedFilesForNav)).map((folderGroup) => (
                        (folderGroup.folderName) ? 
                        (<p></p>) : 
                        (folderGroup.files.map((rootFile) => (
                            <AtlasItemButton 
                                key={rootFile.id}
                                cellItem={{id: rootFile.id, link: rootFile.link, type: AtlasNavigationTypes.File, name:`${rootFile.readableId}-${rootFile.name}`}}
                                onDelete={handleDeleteRequest}
                            />
                        )))
                        )
                    )}
                </ul>
            ) : (<AtlasEmptySelectFileForProjectPane />)}
        </div>
    )
}
                        // .map((file) => (
                        //     <AtlasItemButton 
                        //     key={file.id} 
                        //     cellItem={{id: file.id, link: file.link, type: AtlasNavigationTypes.File, name:`${file.readableId}-${file.name}`}}
                        //     onDelete={handleDeleteRequest} />
                        // ))}