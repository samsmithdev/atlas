import { Prisma } from "@prisma/client";

export const projectSelectorSelect = {
  id: true,
  readableId: true,
  name: true,
  createdDate: true,
  description: true,
  subjectId: true,
};

export type ProjectSelector = Prisma.ProjectGetPayload<{
  select: typeof projectSelectorSelect;
}>;
