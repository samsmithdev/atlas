'use server'
import prisma from '@/app/lib/db'

export async function createFile(newFile: { id?: string, name: string, createdDate?: Date, contents: string, author: string, description: string, tags: string[] }) {
  const { id, name, createdDate, author, description, tags, contents } = newFile;
  // This is the logic we are testing
  const note = await prisma.file.create({
    data: {
      id: id ?? undefined,
      name: name,
      createdDate: createdDate ?? undefined,
      contents: contents,
      author: author,
      description: description,
      tags: tags,
    }
  })
  
  return note
}