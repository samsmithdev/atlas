'use server'
import prisma from '@/app/lib/db';

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