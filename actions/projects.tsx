'use server'
import prisma from '@/lib/db';
import { Project } from '@/app/generated/prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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

export async function createProjectTransaction(formData: FormData) {
    const subjectId = formData.get('subjectId') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    // Basic validation, will consider Zod in the future
    if (!subjectId || !name) {
        throw new Error('Missing required fields');
    }

    const newProject = await prisma.$transaction(async (tx) => {
        // Find the subject and increment the ticker
        const updatedSubject = await tx.subject.update({
            where: { id: subjectId },
            data: {
                projectSequence: { increment: 1 }
            }
        })

        // Generate human readable ID
        const sequenceString = updatedSubject.projectSequence.toString().padStart(6, '0');
        const readableId = `${updatedSubject.shortcode}${sequenceString}`;

        return await tx.project.create({
            data: {
                name,
                description,
                author: 'Sam',
                subjectId: updatedSubject.id,
                readableId: readableId,
            }
        })
    })

    return newProject;
}