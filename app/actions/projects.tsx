'use server'
import prisma from '@/app/lib/db';
import { Project } from '@/app/generated/prisma/client'

export async function createProject(name: string, author: string, description: string, subjectId?: string, createdDate?: Date, id?: string) {
    const project = await prisma.project.create({
        data: {
            id: id,
            name: name,
            created_date: createdDate,
            author: author,
            description: description,
            subjectId: subjectId
        }
    })

    return project
}

export async function fetchProject(projectId: string) {
    const fetchedProject = await prisma.project.findUnique({
        where: {
            id: projectId
        }
    });

    return fetchedProject 
}

export async function fetchProjectsForMenu() {
    const fetchedProjects = await prisma.project.findMany({
        where: {

        },
        select: { 
            name: true,
            id: true,
            subjectId: true,
            subject: true
        }
    });

    return fetchedProjects;
}

export async function fetchFormattedProjectsForNav() {
    const projects = await fetchProjectsForMenu();

    const menuProjectItems = 
}

export async function fetchProjects(subjectId: string) {
    const fetchedProjects = await prisma.project.findMany({
        where: {
            subjectId: subjectId
        },
        orderBy: { id: 'desc' }
    });

    return fetchedProjects;
}

export async function fetchAllProjects() {
    const fetchedProjects = await prisma.project.findMany({
        where: {

        },
        orderBy: { id: 'desc' },
    });

    return fetchedProjects;
}

export async function updateProject(
    projectId: string,
    data: {
        name?: string,
        description?: string,
        addFieldIds?: string[],
        removeFieldIds?: string[],
        deleteFieldIds?: string[]
    }
) {
    try {
        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: {
                name: data.name,
                description: data.description,
                files: {
                    connect: data.addFieldIds?.map(id => ({ id })),
                    disconnect: data.removeFieldIds?.map(id => ({ id })),
                }
            },
            include: {
                files: true
            }
        })

        return { success: true, data: updatedProject };
    } catch (error) {
        console.error("Failed to update project relations:", error);
        return { success: false, error: "Failed to update project" };
    }
}