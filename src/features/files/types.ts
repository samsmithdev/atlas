import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export const fileSelectorSelect = {
  id: true,
  readableId: true,
  name: true,
  createdDate: true,
  description: true,
  tags: true,
} as const;

export type FileSelector = Prisma.Result<
  typeof prisma.file,
  { select: typeof fileSelectorSelect },
  "findFirstOrThrow"
>;
