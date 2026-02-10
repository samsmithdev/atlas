'use server';
import { auth } from '@/auth';
import prisma from '@/lib/db';

interface FileSearchResult {
    id: string;
    name: string;
    description: string;
    readableId: string;
    projectId: string;
}

export async function searchFiles(query: string) {
      // Get the session inside the action
      const session = await auth();
      const userId = session?.user?.id;
    
      if (!userId) {
        throw new Error('Unauthorized: You muse be logged in to create a file.');
      }
      
    const formattedQuery = query.trim().split(/\s+/).join(' & ') + ':*';

    const results = await prisma.$queryRaw<FileSearchResult[]>`
        SELECT id, name, description, "readableId", "projectId"
        FROM files 
        WHERE fts_vector @@ to_tsquery('english', ${formattedQuery}) and "userId" = ${userId}
        LIMIT 10;
    `;

    return results;
}