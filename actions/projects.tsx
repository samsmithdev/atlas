'use server'
import { auth } from '@/auth';
import { checkAuth } from '@/actions/auth';
import prisma from '@/lib/db';
import { Project } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type ActionState = {
    message: string;
    status: 'success' | 'error' | 'idle';
    errors?: {
        name?: string[];
        shortcode?: string[];
        description?: string[];
    };
};

export async function createProjectFormTransaction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    // Get the session inside the action
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error('Unauthorized: You muse be logged in to create a file.');
    }
    // Extract the data
    const subjectId = formData.get('subjectId') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    // Basic validation, will consider Zod in the future
    if (!subjectId || !name) {
        return { status: 'error', message: 'Projects require a subjectId and name.' }
    }

    try {
        await prisma.$transaction(async (tx) => {
            const updatedSubject = await tx.subject.update({
                where: { id: subjectId, userId: userId },
                data: {
                    projectSequence: { increment: 1 }
                }
            });

            const sequenceString = updatedSubject.projectSequence.toString().padStart(6, '0');
            const readableId = `${updatedSubject.shortcode}${sequenceString}`;

            await tx.project.create({
                data: {
                    name,
                    description,
                    userId: userId,
                    subjectId: updatedSubject.id,
                    readableId: readableId,
                }
            });
        });
        revalidatePath('/projects');

        return { status: 'success', message: 'Project successfully created.' }
    } catch (error) {
        return { status: 'error', message: 'Project creation DB error...' }
    }
}

export async function fetchProject(projectId: string) {
    // Get the session inside the action
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error('Unauthorized: You muse be logged in to create a file.');
    }

    const fetchedProject = await prisma.project.findUnique({
        where: {
            id: projectId,
            userId: userId,
        }
    });

    return fetchedProject
}

export async function fetchProjectsForMenu() {
    // Get the session inside the action
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error('Unauthorized: You muse be logged in to create a file.');
    }

    const fetchedProjects = await prisma.project.findMany({
        where: {
            userId: userId,
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

export async function fetchProjectSelector(projectId: string) {
    // Get the session inside the action
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error('Unauthorized: You muse be logged in to create a file.');
    }

    const fetchedProject = await prisma.project.findUnique({
        where: { id: projectId, userId: userId },
        select: {
            name: true,
            id: true,
            readableId: true,
        }
    });

    return fetchedProject;
}

export async function fetchProjectSelectors() {
    // Get the session inside the action
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error('Unauthorized: You muse be logged in to create a file.');
    }

    const fetchedProjects = await prisma.project.findMany({
        where: { userId: userId, },
        select: {
            name: true,
            id: true,
            readableId: true,
        }
    });

    return fetchedProjects;
}

export async function fetchProjects(subjectId: string) {
    // Get the session inside the action
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error('Unauthorized: You muse be logged in to create a file.');
    }
    const fetchedProjects = await prisma.project.findMany({
        where: {
            subjectId: subjectId,
            userId: userId,
        },
        orderBy: { id: 'desc' }
    });

    return fetchedProjects;
}

export async function fetchAllProjects() {
    // Get the session inside the action
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error('Unauthorized: You muse be logged in to create a file.');
    }
    const fetchedProjects = await prisma.project.findMany({
        where: {
            userId: userId,
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
    // Get the session inside the action
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error('Unauthorized: You muse be logged in to create a file.');
    }
    try {
        const updatedProject = await prisma.project.update({
            where: { id: projectId, userId: userId, },
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
    // Get the session inside the action
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error('Unauthorized: You muse be logged in to create a file.');
    }
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
            where: { id: subjectId, userId: userId, },
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
                userId: userId,
                subjectId: updatedSubject.id,
                readableId: readableId,
            }
        })
    })

    return newProject;
}

export async function deleteProject(projectId: string) {
    const { userId } = await checkAuth();

    try {
        const deletedProject = await prisma.project.delete({
            where: {
                id: projectId,
                userId: userId,
            }
        });
        revalidatePath('/projects');
        return { success: true, data: deletedProject }
    } catch (error) {
        console.error("Failed to delete th eproject:", error);
        return { success: false, error: error }
    }
}