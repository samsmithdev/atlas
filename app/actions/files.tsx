'use server'
import prisma from '@/app/lib/db'

export async function createFile(newFile: { id?: string, name: string, createdDate?: Date, contents: string, author: string, description: string, tags: string[], projectId?: string | null}) {
  const { id, name, createdDate, author, description, tags, contents, projectId } = newFile;
  
  if(!id && projectId) {
    
  };

  const file = await prisma.file.create({
    data: {
      id: id ?? undefined,
      name: name,
      createdDate: createdDate ?? undefined,
      contents: contents,
      author: author,
      description: description,
      tags: tags,
    }
  });
  
  return file
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