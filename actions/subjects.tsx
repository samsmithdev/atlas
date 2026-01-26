'use server'

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
    // Extract the data
    const name = formData.get('name') as string;
    const shortcode = formData.get('shortcode') as string;
    const description = formData.get('description') as string;

    const duplicateSubjectShortcode = await prisma.subject.findUnique({
        where: {
            shortcode: shortcode
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
                description
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
    const newSubject = prisma.subject.create({
        data: {
            id: subjectData.id,
            shortcode: subjectData.shortcode,
            name: subjectData.name,
            description: subjectData.description ?? "",
        }
    });

    return newSubject;
}

export async function fetchSubjects() {
    const subjects = await prisma.subject.findMany();

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
    try {
        const updatedSubject = await prisma.subject.update({
            where: { id: subjectId },
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

        return { success: true, data: updatedSubject };
    } catch (error) {
        console.error("Failed to update subject relations:", error);
        return {}
    }
}