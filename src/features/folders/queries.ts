"use server";

import { checkAuth } from "@/features/auth/queries";
import prisma from "@/lib/db";

export async function fetchFolderDetails(folderId: string) {
  await checkAuth();

  const folder = await prisma.folder.findUnique({
    where: { id: folderId },
    select: { id: true, name: true, projectId: true },
  });

  return folder;
}

export async function fetchFoldersForProject(projectId: string) {
  await checkAuth();

  const folders = await prisma.folder.findMany({
    where: { projectId: projectId },
    select: { id: true, name: true, projectId: true },
  });

  return folders;
}
