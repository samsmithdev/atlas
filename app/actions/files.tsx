'use server'
import prisma from '@/app/lib/db'
import { revalidatePath } from 'next/cache';

export async function createFile(newFile: { id?: string, name: string, createdDate?: Date, content: string, author: string, description: string, tags: string[], projectId?: string | null }) {
  const { id, name, createdDate, author, description, tags, content, projectId } = newFile;

  if (!id && projectId) {

  };

  const file = await prisma.file.create({
    data: {
      id: id ?? undefined,
      name: name,
      createdDate: createdDate ?? undefined,
      content: content,
      author: author,
      description: description,
      tags: tags,
    }
  });

  return file
}

export async function fetchFile(fileId: string) {
  const file = await prisma.file.findUnique({
    where: {
      id: fileId
    }
  });

  return file;
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

export async function updateFile(fileId: string, content: string) {
  try {
    const updatedFile = await prisma.file.update({
      where: { id: fileId },
      data: {
        content: content
      },
    });

    //revalidatePath(`/files/${fileId}`);

    return { success: true, data: updatedFile }
  } catch (error) {
    console.error("Failed to update file:", error);
    return { success: false, error: "failed to save" }
  }
}

export async function deleteFile(fileId: string) {
  try {
    const deletedUser = await prisma.file.delete({
      where: {
        id: fileId
      }
    })

    return { success: true, data: deletedUser }
  } catch (error) {
    console.error("Failed to delete file:", error);
    return { success: false, error: error }
  }
}