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

export async function fetchProjects(subjectId: string) {
    const fetchedProjects = await prisma.project.findMany({
        where: {
            subjectId: subjectId
        },
        orderBy: { id: 'desc' }
    });

    return fetchedProjects;
}