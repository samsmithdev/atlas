'use server';

import { auth } from '@/auth';
import { checkAuth } from '@/actions/auth';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export type ActionState = {
    message: string;
    status: 'success' | 'error' | 'idle';
    errors?: {
        name?: string[];
        shortcode?: string[];
        description?: string[];
    };
};

export async function createFolderFormTransaction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const {session, userId} = await checkAuth();

    // Extract the data
    const name = formData.get('name') as string;
    const projectId = formData.get('projectId') as string;

    if (!name || !projectId) {
        return { status: 'error', message: 'Folders require a name and Project ID' };
    }

    try {
        await prisma.$transaction(async (tx) => {
            await tx.folder.create({
                data: {
                    name,
                    projectId,
                    userId
                }
            });
        });
        revalidatePath('/projects');
        return { status: 'success', message: 'Folder successfully created!'};
    } catch (error) {
        return { status: 'error', message: 'DB Error attempting to create folder' };
    }
}

export async function fetchFolderDetails(folderId: string) {
    await checkAuth();

    const folder = await prisma.folder.findUnique({
        where: { id: folderId },
        select: { id: true, name: true, projectId: true }
    });

    return folder;
}

export async function fetchFoldersForProject(projectId: string) {
    await checkAuth();

    const folders = await prisma.folder.findMany({
        where: { projectId: projectId },
        select: { id: true, name: true, projectId: true }
    });

    return folders;
}

export async function deleteFolder(folderId: string) {
    const {userId} = await checkAuth();

    try {
        const deletedFolder = await prisma.folder.delete({
            where: {
                id: folderId,
                userId: userId
            }
        });
        revalidatePath('/projects');
        return { success: true, data: deletedFolder}
    } catch (error) {
        console.error("Failed to delete folder:", error);
        return { success: false, error: error }
    }
}