'use server';
import prisma from '@/lib/db';

export async function searchFiles(query: string) {
    const formattedQuery = query.trim().split(/\s+/).join(' & ') + ':*';

    const results = await prisma.$queryRaw`
        SELECT id, name, description, readableId
        FROM files 
        WHERE fts_vector @@ to_tsquery('english', ${formattedQuery})
        LIMIT 10;
    `;

    return results;
}