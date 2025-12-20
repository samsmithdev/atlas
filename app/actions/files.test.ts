import { describe, it, expect, vi, test } from 'vitest'

// 1. Import the "Real" code we want to test
// (I'm assuming you'll have a function called 'createNote' eventually)
import { createFile } from './files' 

// 2. Import the "Real" DB file
// BUT... because of the magic line below, it will actually import the MOCK
import prisma from '@/app/lib/db' //'@/app/lib/db'

// 3. THE MAGIC LINE
// This tells Vitest: "Go look in the __mocks__ folder for this file"
vi.mock('@/app/lib/db') 

describe('createFile with All Parameters Action', () => {
  it('should save a new file to the database and return it', async () => {
    // ARRANGE (Setup the Mock)
    const testContentString = "Prisma ORM connects NextJS with Postgres."
    const testAuthorString = "Vitest"
    const testDescriptionString = "Vitest description"
    const testNameString = "Vitest Test File"
    const testTagArray: string[] = []
    const testId = "99999999999999"
    const testCreatedDate: Date = new Date()

    // { id?: string, name: string, createdDate?: Date, contents: string, author: string, description: string, tags: string[] }
    const newFile = {
      id: testId,
      name: testNameString,
      createdDate: testCreatedDate,
      contents: testContentString,
      author: testAuthorString,
      description: testDescriptionString,
      tags: testTagArray,
      projectId: null
    }

    // We tell the mock: "When someone calls prisma.note.create, return this object"
    // Note: TypeScript might complain if 'note' doesn't exist on your schema yet.
    // Replace 'note' with whatever model name you have (e.g., 'post', 'item')
    vi.mocked(prisma.file.create).mockResolvedValue(newFile)

    // ACT (Run the function)
    // We pass the raw input typical of a form submission
    const result = await createFile(newFile)

    // ASSERT (Check the logs)
    // 1. Did we get the right data back?
    expect(result).toEqual(newFile)

    // 2. Did the database actually get called with the right parameters?
    expect(prisma.file.create).toHaveBeenCalledWith({
      data: {
        contents: testContentString,
        author: testAuthorString,
        description: testDescriptionString,
        name: testNameString,
        tags: testTagArray
      }
    })
  })
})