import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export const folderSelectorSelect = {
  id: true,
  name: true,
  projectId: true,
  parentId: true,
  isRoot: true,
} as const;

export type FolderSelector = Prisma.Result<
  typeof prisma.folder,
  { select: typeof folderSelectorSelect },
  "findFirstOrThrow"
>;
