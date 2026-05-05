import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export const projectSelectorSelect = {
  id: true,
  readableId: true,
  name: true,
  createdDate: true,
  description: true,
  subjectId: true,
  readableName: true,
};

export type ProjectSelector = Prisma.Result<
  typeof prisma.project,
  { select: typeof projectSelectorSelect },
  "findFirstOrThrow"
>;
