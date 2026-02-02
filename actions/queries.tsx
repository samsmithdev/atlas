'use server';
import prisma from '@/lib/db';

interface FileSearchResult {
    id: string;
    name: string;
    description: string;
    readableId: string;
    projectId: string;
}

export async function searchFiles(query: string) {
    const formattedQuery = query.trim().split(/\s+/).join(' & ') + ':*';

    const results = await prisma.$queryRaw<FileSearchResult[]>`
        SELECT id, name, description, "readableId", "projectId"
        FROM files 
        WHERE fts_vector @@ to_tsquery('english', ${formattedQuery})
        LIMIT 10;
    `;

    return results;
}