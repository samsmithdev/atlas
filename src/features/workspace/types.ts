// NOTE: This may be broken into types/subject-types.ts etc if it becomes too long

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

// MARK: BASE SELECTORS
export const subjectSelectorSelect = {
  id: true,
  shortcode: true,
  name: true,
  description: true,
  readableName: true,
} as const;

export const projectSelectorSelect = {
  id: true,
  readableId: true,
  name: true,
  createdDate: true,
  description: true,
  subjectId: true,
  readableName: true,
};

export const folderSelectorSelect = {
  id: true,
  name: true,
  projectId: true,
  parentId: true,
  isRoot: true,
  depth: true,
} as const;

export const fileSelectorSelect = {
  id: true,
  readableId: true,
  name: true,
  createdDate: true,
  description: true,
  tags: true,
} as const;

// MARK: COMPOSED TYPES

export const fileContentSelect = {
  ...fileSelectorSelect,
  content: true,
  assets: true,
} as const;

export const subjectSelectorWithProjectSelectorSelect = {
  ...subjectSelectorSelect,
  projects: {
    select: projectSelectorSelect,
    orderBy: { readableId: "asc" },
  },
};

// MARK: EXPORTED TYPES

export type SubjectSelector = Prisma.Result<
  typeof prisma.subject,
  { select: typeof subjectSelectorSelect },
  "findFirstOrThrow"
>;

export type SubjectWithProjectSelectors = Prisma.Result<
  typeof prisma.subject,
  { select: typeof subjectSelectorWithProjectSelectorSelect },
  "findFirstOrThrow"
>;

export type ProjectSelector = Prisma.Result<
  typeof prisma.project,
  { select: typeof projectSelectorSelect },
  "findFirstOrThrow"
>;

export type FolderSelector = Prisma.Result<
  typeof prisma.folder,
  { select: typeof folderSelectorSelect },
  "findFirstOrThrow"
>;

export type FileSelector = Prisma.Result<
  typeof prisma.file,
  { select: typeof fileSelectorSelect },
  "findFirstOrThrow"
>;

export type FileContent = Prisma.Result<
  typeof prisma.file,
  { select: typeof fileContentSelect },
  "findFirstOrThrow"
>;
