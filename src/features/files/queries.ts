"use server";

import { checkAuth } from "@/features/auth/queries";
import { NULL_PROJECTID } from "@/lib/constants/uncategorized-items";
import prisma from "@/lib/db";
import { auth } from "auth";

// MARK: Prisma Fetches

export async function fetchFile(fileId: string) {
  // Get the session inside the action
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized: You muse be logged in to create a file.");
  }

  const file = await prisma.file.findUnique({
    where: {
      id: fileId,
      userId: userId,
    },
  });

  return file;
}

export async function fetchFileNavItemsForProject(projectId: string) {
  // Get the session inside the action
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized: You muse be logged in to create a file.");
  }

  const files = await prisma.file.findMany({
    where: {
      projectId: projectId,
      userId: userId,
    },
    select: {
      id: true,
      readableId: true,
      name: true,
      folderId: true,
      folder: {
        select: {
          name: true, // Select only the parent's name field
        },
      },
    },
  });

  return files;
}

export async function fetchFilesForProject(projectId: string) {
  // Get the session inside the action
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized: You muse be logged in to create a file.");
  }

  const files = await prisma.file.findMany({
    where: {
      projectId: projectId,
      userId: userId,
    },
    orderBy: { id: "desc" },
  });

  return files;
}

export async function fetchFilesForProjectFileNavigator(projectId: string) {
  // Get the session inside the action
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized: You muse be logged in to create a file.");
  }

  const fileMenuItems = (
    await prisma.file.findMany({
      where: { projectId: projectId, userId: userId },
      select: { name: true, id: true, projectId: true },
    })
  ).map((file) => {
    return {
      name: file.name,
      id: file.id,
      projectId: file.projectId ?? NULL_PROJECTID,
    };
  });
  return fileMenuItems;
}

// MARK: Raw SQL Queries

interface FileSearchResult {
  id: string;
  name: string;
  description: string;
  readableId: string;
  projectId: string;
}

// "readableId", "projectId"
export async function searchFiles(query: string) {
  const { userId } = await checkAuth();

  const formattedQuery = query.trim().split(/\s+/).join(" & ") + ":*";

  const results = await prisma.$queryRaw<FileSearchResult[]>`
        SELECT id, name, description, readable_id as "readableId", project_id as "projectId"
        FROM files 
        WHERE fts_vector @@ to_tsquery('english', ${formattedQuery}) and user_id = ${userId}
        LIMIT 10;
    `;

  return results;
}
