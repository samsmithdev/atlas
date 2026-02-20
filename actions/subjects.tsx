'use server'

import { auth } from '@/auth';
import { checkAuth } from './auth';
import prisma from '@/lib/db';
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

export async function createSubjectTransaction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    // Get the session inside the action
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error('Unauthorized: You muse be logged in to create a file.');
    }
    // Extract the data
    const name = formData.get('name') as string;
    const shortcode = formData.get('shortcode') as string;
    const description = formData.get('description') as string;

    const duplicateSubjectShortcode = await prisma.subject.findUnique({
        where: {
            shortcode: shortcode,
            userId: userId,
        }
    })

    if (!name || name.length < 3) {
        return { status: 'error', message: 'Name must be at least 3 characters.' };
    } else if (duplicateSubjectShortcode) {
        return { status: 'error', message: 'Shortcode must be unique.' };
    }

    try {
        await prisma.subject.create({
            data: {
                name,
                shortcode,
                description,
                userId: userId,
            },
        });

        revalidatePath('/projects');

        return { status: 'success', message: 'Subject created successfully!' };
    } catch (error) {
        return { status: 'error', message: `Database Error: Failed to create subject. DB response was '${error}'` };
    }
}

export async function createSubject(subjectData: {
    id?: string,
    shortcode: string,
    name: string,
    description?: string,
}) {
    // Get the session inside the action
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error('Unauthorized: You muse be logged in to create a file.');
    }
    const newSubject = prisma.subject.create({
        data: {
            id: subjectData.id,
            shortcode: subjectData.shortcode,
            name: subjectData.name,
            description: subjectData.description ?? "",
            userId: userId,
        }
    });

    return newSubject;
}

export async function fetchSubjects() {
    // Get the session inside the action
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error('Unauthorized: You muse be logged in to create a file.');
    }
    const subjects = await prisma.subject.findMany({
        where: {
            userId: userId,
        }
    });

    return subjects;
}

export async function fetchSubjectSelectors() {
    // Get the session inside the action
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error('Unauthorized: You muse be logged in to create a file.');
    }
    const subjects = await prisma.subject.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            shortcode: true,
            name: true,
        }
    });

    return subjects;
}

export async function updateSubject(
    subjectId: string,
    updatedSubjectData: {
        shortcode?: string,
        name?: string,
        description?: string,
        addProjectIds?: string[],
        removeProjectIds?: string[],
        deleteProjectIds?: string[],
    }
) {
    // Get the session inside the action
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error('Unauthorized: You muse be logged in to create a file.');
    }

    try {
        const updatedSubject = await prisma.subject.update({
            where: { id: subjectId, userId: userId },
            data: {
                name: updatedSubjectData.name,
                shortcode: updatedSubjectData.shortcode,
                description: updatedSubjectData.description,
                projects: {
                    connect: updatedSubjectData.addProjectIds?.map(id => ({ id })),
                    disconnect: updatedSubjectData.removeProjectIds?.map(id => ({ id })),
                },
            },
            include: {
                projects: true
            }
        });
        revalidatePath('/projects');
        return { success: true, data: updatedSubject };
    } catch (error) {
        console.error("Failed to update subject relations:", error);
        return {}
    }
}

export async function deleteSubject(subjectId: string) {
    const { userId } = await checkAuth();

    try {
        const deletedSubject = await prisma.subject.delete({
            where: {
                id: subjectId,
                userId: userId,
            }
        });

        revalidatePath('/projects');
        return { success: true, data: deletedSubject }
    } catch (error) {
        console.error("Failed to delete Subject:", error);
        return { success: false, error: error }
    }
}