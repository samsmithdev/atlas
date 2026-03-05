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

// "readableId", "projectId"
export async function searchFiles(query: string) {
      // Get the session inside the action
      const session = await auth();
      const userId = session?.user?.id;
    
      if (!userId) {
        throw new Error('Unauthorized: You muse be logged in to create a file.');
      }
      
    const formattedQuery = query.trim().split(/\s+/).join(' & ') + ':*';

    const results = await prisma.$queryRaw<FileSearchResult[]>`
        SELECT id, name, description, readable_id as "readableId", project_id as "projectId"
        FROM files 
        WHERE fts_vector @@ to_tsquery('english', ${formattedQuery}) and user_id = ${userId}
        LIMIT 10;
    `;

    return results;
}