import { describe, it, expect, vi, test } from 'vitest'
// Import File type for being able to code 
import { Project } from '@/app/generated/prisma/client'

// 1. Import the "Real" code we want to test
// (I'm assuming you'll have a function called 'createNote' eventually)
import { createProject, fetchProjects } from './projects'

// 2. Import the "Real" DB file
// BUT... because of the magic line below, it will actually import the MOCK
import prisma from '@/app/lib/db' //'@/app/lib/db'

// 3. THE MAGIC LINE
// This tells Vitest: "Go look in the __mocks__ folder for this file"
vi.mock('@/app/lib/db')

describe('createProject with All Parameters Action', () => {
    it('should save a new project to the database and return it', async () => {
        // ARRANGE (Setup the Mock)
        const newProject: Project = {
            id: "Test Project ID 0001",
            author: "Test Project Author",
            description: "Test Project Description",
            created_date: new Date(),
            name: "Test Project Name A",
            subjectId: null
        }

        vi.mocked(prisma.project.create).mockResolvedValue(newProject)

        // ACT (Run the function)
        // We pass the raw input typical of a form submission
        const result = await createProject(newProject.name, newProject.author, newProject.description, undefined, newProject.created_date, newProject.id)

        // ASSERT (Check the logs)
        // 1. Did we get the right data back?
        expect(result).toEqual(newProject)

        // 2. Did the database actually get called with the right parameters?
        expect(prisma.project.create).toHaveBeenCalledWith({
            data: {
                name: newProject.name,
                id: newProject.id,
                created_date: newProject.created_date,
                author: newProject.author,
                description: newProject.description,
                subjectId: undefined
            }
        })
    })
})

describe('fetchProjects with subjectId', () => {
    it('should return projects with subject ID', async () => {
        const numberOfMockProjects = 5
        const mockedSubjectID = "Test Subject ID"
        const mockedProjects: Project[] = Array.from({ length: numberOfMockProjects }, (i) => {
            const mockedProject: Project = {
                id: `Test Project ID ${i}`,
                name: `Test Project Name #${i}`,
                author: `Test Project Author #${i}`,
                created_date: new Date(),
                description: `Test project description ${i}`,
                subjectId: mockedSubjectID,
            }

            return mockedProject
        });

        vi.mocked(prisma.project.findMany).mockResolvedValue(mockedProjects);

        const result = await fetchProjects(mockedSubjectID);

        expect(result).toHaveLength(numberOfMockProjects);

        expect(prisma.project.findMany).toHaveBeenCalledWith({
            where: { subjectId: mockedSubjectID },
            orderBy: { id: 'desc' },
        })
    })
})