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

describe('createFile Action', () => {
  it('should save a new file to the database and return it', async () => {
    // ARRANGE (Setup the Mock)
    const newNote = { 
      id: 1, 
      content: 'Remember to buy milk', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    }

    // We tell the mock: "When someone calls prisma.note.create, return this object"
    // Note: TypeScript might complain if 'note' doesn't exist on your schema yet.
    // Replace 'note' with whatever model name you have (e.g., 'post', 'item')
    prisma.file.create.mockResolvedValue(newNote)

    // ACT (Run the function)
    // We pass the raw input typical of a form submission
    const result = await createFile('Remember to buy milk')

    // ASSERT (Check the logs)
    // 1. Did we get the right data back?
    expect(result).toEqual(newNote)

    // 2. Did the database actually get called with the right parameters?
    expect(prisma.file.create).toHaveBeenCalledWith({
      data: {
        content: 'Remember to buy milk'
      }
    })
  })
})