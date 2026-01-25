import { describe, it, expect, vi, test } from 'vitest'
// Import File type for being able to code 
import { File } from '@prisma/client'

// 1. Import the "Real" code we want to test
// (I'm assuming you'll have a function called 'createNote' eventually)
import { createFile, fetchFilesForProject, updateFile, deleteFile } from './files'

// 2. Import the "Real" DB file
// BUT... because of the magic line below, it will actually import the MOCK
import prisma from '@/lib/db' //'@/app/lib/db'

// 3. THE MAGIC LINE
// This tells Vitest: "Go look in the __mocks__ folder for this file"
vi.mock('@/app/lib/db')

describe('updateFile Action', () => {
  it('should update a file and return the updated file', async () => {
    const originalContent = "Test Original Content"
    const updatedContent = "Test Updated Content"

    const originalFile: File = {
      id: "Test ID 0001",
      author: "Test Author",
      content: originalContent,
      createdDate: new Date(),
      description: "Test description",
      name: "Test File Name",
      projectId: null,
      tags: []
    }

    const updatedFile: File = {
      id: originalFile.id,
      author: originalFile.author,
      createdDate: originalFile.createdDate,
      description: originalFile.description,
      name: originalFile.name,
      projectId: originalFile.projectId,
      tags: originalFile.tags,
      content: updatedContent,
    }

    const expectedResult = { success: true, data: updatedFile };

    vi.mocked(prisma.file.update).mockResolvedValue(updatedFile);

    const result = await updateFile(originalFile.id, updatedContent);

    expect(result.success).toBe(true)

    if (result.success) {
      expect(result.data?.id).toMatch(updatedFile.id);
    }
  })
})

describe('deleteFile with FileId', () => {
  it('should delete a new file from the database and return it', async () => {
    const fileToDelete: File = {
      author: "Test Author",
      content: "Test Content",
      createdDate: new Date(),
      description: "Description",
      id: "Test ID 001",
      name: "Test Name",
      projectId: null,
      tags: []
    }

    vi.mocked(prisma.file.delete).mockResolvedValue(fileToDelete)

    const result = await deleteFile(fileToDelete.id)

    expect(result.success).toBe(true)
    expect(result.data).toBeDefined()

    if (result.success && result.data) {
      expect(result.data.id).toBe(fileToDelete.id)
    }
  })
})

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
      content: testContentString,
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
        content: testContentString,
        author: testAuthorString,
        createdDate: testCreatedDate,
        id: testId,
        description: testDescriptionString,
        name: testNameString,
        tags: testTagArray
      }
    })
  })
})

describe('getFilesByProject', () => {
  it('should return all files associated with a specific project', async () => {
    // --- ARRANGE ---
    // We create "Fake Data" (The Fixture)
    // Notice: We just make up a projectId. We don't need to create a Project first.
    const mockFiles: File[] = [];
    const testProjectId = 'TestProjID-00000';
    const testNumberOfFiles = 5;

    for (let i = 0; i < testNumberOfFiles; i++) {
      mockFiles.push({
        author: `Mock Author ${i}`,
        content: `Mock Contents ${i}: this is longer text`,
        createdDate: new Date(),
        description: `Mock Description ${i}: this is a mock description`,
        name: `Mock File Name ${i}`,
        id: `Mock ID ${i}`,
        tags: [],
        projectId: `${testProjectId}`
      });
    }

    // We tell the mock: "If anyone calls findMany, give them this list."
    vi.mocked(prisma.file.findMany).mockResolvedValue(mockFiles);

    // --- ACT ---
    const result = await fetchFilesForProject(testProjectId);

    // --- ASSERT ---

    // Check 1: Did we get the data back?
    expect(result).toHaveLength(testNumberOfFiles)

    expect(result[0]).toBe(mockFiles[0])

    expect(prisma.file.findMany).toHaveBeenCalledWith({
      where: { projectId: testProjectId },
      orderBy: { id: 'desc' }
    })
  })
})