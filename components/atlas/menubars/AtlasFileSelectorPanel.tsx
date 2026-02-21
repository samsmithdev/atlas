'use client';

import { deleteFile } from "@/actions/files";
import { AtlasListItem } from "@/types/AtlasListTypes";
import { useParams } from "next/navigation";
import { startTransition, useOptimistic } from "react";

interface AtlasFileSelectorPanelProps {
    files: AtlasListItem[];
    className?: string;
}

export default function AtlasFileSelectorPanel({ files }: AtlasFileSelectorPanelProps) {
    const params = useParams();
    const activeFileId = params.fileId as string;

    const [optimisticFiles, removeOptimisticFile] = useOptimistic(
        files,
        (currentFiles, fileIdToRemove: string) => {
            return currentFiles.filter(file => file.itemId !== fileIdToRemove);
        }
    );

    const handleDeleteRequest = async (fileId: string) => {
        startTransition(() => {
            removeOptimisticFile(fileId);
        });

        const result = await deleteFile(fileId);

        if (!result.success) {
            console.error('Failed to delete');
        }
    }

}