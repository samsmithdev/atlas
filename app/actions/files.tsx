'use server'
import prisma from '@/app/lib/db'

export async function createFile(contents: string) {
  // This is the logic we are testing
  const note = await prisma.file.create({
    data: {
      name: "test name",
      contents: contents,
      author: "sam",
      description: "description",
      tags: [],
    }
  })
  
  return note
}