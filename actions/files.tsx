'use server'

import { auth } from '@/auth';
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache';
import { NULL_PROJECTID, NULL_PROJECT_NAME } from '../lib/constants/uncategorized-items';

export type ActionState = {
    message: string;
    status: 'success' | 'error' | 'idle';
    errors?: {
        name?: string[];
        shortcode?: string[];
        description?: string[];
    };
};

export async function createFileFormTransaction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // Get the session inside the action
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized: You muse be logged in to create a file.');
  }

  const userId = session!.user!.id!;

  // Extract the data
  const projectId = formData.get('projectId') as string;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  if (!projectId || !name) {
    return { status: 'error', message: 'Files require a ProjectId and name.' };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const updatedProject = await tx.project.update({
        where: { id: projectId },
        data: {
          fileSequence: { increment: 1 }
        }
      });

      const sequenceString = updatedProject.fileSequence.toString().padStart(6, '0');
      const readableId = `${updatedProject.readableId}-${sequenceString}`;

      await tx.file.create({
        data: {
          name,
          description,
          userId: userId,
          projectId: updatedProject.id,
          readableId: readableId
        }
      });
    });
    revalidatePath('/projects');
    return { status: 'success', message: 'File successfully created.' }
  } catch (error) {
    return { status: 'error', message: 'DB Error attempting to create file...' };
  }
}

export async function createFileTransaction(formData: FormData) {
    // Get the session inside the action
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized: You muse be logged in to create a file.');
  }

  const userId = session!.user!.id!;
  const projectId = formData.get('projectId') as string;
  const name = formData.get('name') as string;
  const author = 'Sam';
  const description = formData.get('description') as string;

  if (!projectId || !name) {
    throw new Error('Missing required fields');
  }

  const newFile = prisma.$transaction(async (tx) => {
    // Find the project and increment the ticker
    const updatedProject = await tx.project.update({
      where: { id: projectId },
      data: {
        fileSequence: { increment: 1 }
      }
    })

    const sequenceString = updatedProject.fileSequence.toString().padStart(6, '0');
    const readableId = `${updatedProject.readableId}-${sequenceString}`;

    return await tx.file.create({
      data: {
        name,
        description,
        userId,
        projectId: updatedProject.id,
        readableId: readableId,
      }
    })
  })

  return newFile;
}

export async function fetchFile(fileId: string) {
    // Get the session inside the action
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized: You muse be logged in to view a file.');
  }

  const file = await prisma.file.findUnique({
    where: {
      id: fileId
    }
  });

  if (file && file.userId !== session?.user?.id) {
    throw new Error('Unauthorized: User IDs do not match.');
  }

  return file;
}

export async function fetchFileNavItemsForProject(projectId: string) {
    const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized: You muse be logged in to view a file.');
  }

  const files = await prisma.file.findMany({
    where: {
      projectId: projectId,
      userId: session?.user?.id,
    },
    select: {
      id: true,
      readableId: true,
      name: true
    }
  });

  return files;
}

export async function fetchFilesForProject(projectId: string) {
  const files = await prisma.file.findMany({
    where: {
      projectId: projectId,
    },
    orderBy: { id: 'desc' }
  });

  return files;
}

export async function fetchFilesForProjectFileNavigator(projectId: string) {
  const fileMenuItems = (await prisma.file.findMany({
    where: { projectId: projectId },
    select: { name: true, id: true, projectId: true }
  })).map((file) => {
    return { name: file.name, id: file.id, projectId: file.projectId ?? NULL_PROJECTID }
  })
  return fileMenuItems
}

export async function updateFile(fileId: string, content: string) {
  try {
    const updatedFile = await prisma.file.update({
      where: { id: fileId },
      data: {
        content: content
      },
    });

    revalidatePath(`/projects/${updatedFile.projectId}/files/${fileId}`);

    return { success: true, data: updatedFile }
  } catch (error) {
    console.error("Failed to update file:", error);
    return { success: false, error: "failed to save" }
  }
}

export async function deleteFile(fileId: string) {
  try {
    const deletedFile = await prisma.file.delete({
      where: {
        id: fileId
      }
    })
    revalidatePath('/projects');
    return { success: true, data: deletedFile }
  } catch (error) {
    console.error("Failed to delete file:", error);
    return { success: false, error: error }
  }
}