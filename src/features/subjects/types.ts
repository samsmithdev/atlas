import { Prisma } from "@prisma/client";

export const subjectSelectorSelect = {
  id: true,
  shortcode: true,
  name: true,
  description: true,
} satisfies Prisma.SubjectSelect;

export type SubjectSelector = Prisma.SubjectGetPayload<{
  select: typeof subjectSelectorSelect;
}>;
