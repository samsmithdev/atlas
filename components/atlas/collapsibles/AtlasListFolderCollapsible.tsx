'use client'

import { deleteFile } from "@/actions/files";
import { AtlasListItem } from "@/types/AtlasListTypes";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { startTransition, useOptimistic, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import AtlasListItemCard from "../cards/AtlasListItemCard";

interface AtlasListFolderCollapsibleProps {
    folderName: string;
    folderId: string;
    folderItems: AtlasListItem[];
    onDelete: (id: string) => void;
}

export default function AtlasListFolderCollapsible({ folderName, folderId, folderItems, onDelete }: AtlasListFolderCollapsibleProps) {

    const [isOpen, setIsOpen] = useState(false);

    const [optimisticFiles, removeOptimisticFile] = useOptimistic(
        folderItems,
        (currentFiles, fileIdToRemove: string) => {
            return currentFiles.filter(file => file.itemId !== fileIdToRemove);
        }
    )

    const handleDeleteRequest = async (fileId: string) => {
        startTransition(() => {
            removeOptimisticFile(fileId);
        });

        const result = await deleteFile(fileId);

        if (!result.success) {
            console.error("Failed to delete");
        }
    }

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className='flex flex-col gap-2'
        >
            <div className="flex items-center justify-between gap-4 px-4">
                <CollapsibleTrigger asChild>
                    <Button variant="atlas_list_item" className="flex-1">
                        <h4 className="text-sm font-semibold">{folderName}</h4>
                    </Button>
                </CollapsibleTrigger>
                <Button variant="ghost" onClick={() => onDelete(folderId)}size='icon'>x</Button>
            </div>

            <CollapsibleContent className="flex flex-col gap-2">
                {optimisticFiles && optimisticFiles.length > 0 ? (<ul>
                    {optimisticFiles.sort((a, b) => a.displayText.localeCompare(b.displayText)).map((file) => (
                        <AtlasListItemCard key={file.itemId} displayText={file.displayText} itemId={file.itemId} onDelete={handleDeleteRequest} href={file.link} />
                    ))}
                </ul>) : (<p>No Files</p>)}
            </CollapsibleContent>
        </Collapsible>
    )
}