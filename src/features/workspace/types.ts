// NOTE: This may be broken into types/subject-types.ts etc if it becomes too long

// MARK: Imports
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

// MARK: Subjects
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

// MARK: Projects
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

// MARK: Folders
export const folderSelectorSelect = {
  id: true,
  name: true,
  projectId: true,
  parentId: true,
  isRoot: true,
  depth: true,
} as const;

export type FolderSelector = Prisma.Result<
  typeof prisma.folder,
  { select: typeof folderSelectorSelect },
  "findFirstOrThrow"
>;

// MARK: Files
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

export const fileContentSelect = {
  ...fileSelectorSelect,
  content: true,
  assets: true,
} as const;

export type FileContent = Prisma.Result<
  typeof prisma.file,
  { select: typeof fileContentSelect },
  "findFirstOrThrow"
>;
