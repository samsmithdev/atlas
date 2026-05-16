import { z } from "zod";

export const createSubjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Subject name is required.")
    .max(50, "Subject name is too long."),
  shortcode: z
    .string()
    .trim()
    .toUpperCase()
    .min(1, "Shortcode is required.")
    .max(4, "Shortcode is too long.")
    .regex(/^[A-Z]+$/, "Shortcode can only contain letters."),
  description: z
    .string()
    .trim()
    .max(255, "Description is too long")
    .default(""),
});

export const createProjectSchema = z.object({
  subjectId: z
    .string()
    .min(
      1,
      "System Error: Missing subject context. Please refresh the page and try again."
    ),
  name: z
    .string()
    .trim()
    .min(1, "Project name cannot be empty.")
    .max(100, "Project name is too long"),
  description: z.string().trim().max(255, "Description too long.").default(""),
});

export const createFolderSchema = z.object({
  projectId: z
    .string()
    .min(
      1,
      "System Error: Missing project context. Please refresh the page and try again."
    ),
  parentId: z
    .string()
    .min(
      1,
      "System Error: Missing parent folder context. Please refresh the page."
    ),
  name: z
    .string()
    .min(1, "Folder name cannot be empty.")
    .max(100, "Folder name is too long."),
});

export const createFileSchema = z.object({
  folderId: z
    .string()
    .min(
      1,
      "System Error: Missing folder context. Please refresh the page and try again."
    ),
  projectId: z
    .string()
    .min(
      1,
      "System Error: Missing project context. Please refresh the page and try again."
    ),

  name: z
    .string()
    .trim()
    .min(1, "File name cannot be empty")
    .max(255, "File name is too long"),
  description: z.string().trim().optional(),

  tags: z
    .array(z.string().trim().toLowerCase())
    .max(10, "Maximum number of tags reached.")
    .default([]),
});
