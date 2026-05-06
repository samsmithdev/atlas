import { z } from "zod";

export const createFolderSchema = z.object({
  projectId: z
    .string()
    .min(1, "System Error: Missing project context. Please refresh the page."),
  parentFolderId: z
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
