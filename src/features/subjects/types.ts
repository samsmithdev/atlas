import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export const subjectSelectorSelect = {
  id: true,
  shortcode: true,
  name: true,
  description: true,
  readableName: true,
} as const;

export type SubjectSelector = Prisma.Result<
  typeof prisma.subject,
  { select: typeof subjectSelectorSelect },
  "findFirstOrThrow"
>;
