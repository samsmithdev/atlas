"use server";
// NOTE: This may be broken into actions/subject-actions.ts etc if it becomes too long

// MARK: Imports
import {
  failedActionResponse,
  successActionResponse,
} from "@/lib/actions/responses";
import { ActionResponse } from "@/lib/actions/types";
import { withFormAuth } from "@/lib/actions/wrapper";
import prisma from "@/lib/db";
import { extractErrorMessages } from "@/lib/errors";
import { revalidatePath } from "next/cache";
import {
  FolderSelector,
  ProjectSelector,
  projectSelectorSelect,
  SubjectSelector,
  subjectSelectorSelect,
} from "./types";
import { createFolderSchema, createSubjectSchema } from "./z-schema";

// MARK: Subjects
export const createSubjectFormAction = withFormAuth(
  async (
    userId: string,
    prevState: ActionResponse<SubjectSelector>,
    formData: FormData
  ) => {
    const parsed = createSubjectSchema.safeParse({
      name: formData.get("name"),
      shortcode: formData.get("shortcode"),
      description: formData.get("description"),
    });

    if (!parsed.success) {
      return failedActionResponse(
        "Validation Failed",
        extractErrorMessages(parsed.error)
      );
    }

    const { name, shortcode, description } = parsed.data;

    try {
      const result = (await prisma.subject.create({
        data: {
          name,
          shortcode,
          description: description ?? "",
          userId,
        },
        select: subjectSelectorSelect,
      })) as SubjectSelector;

      revalidatePath("/projects");

      return successActionResponse(result);
    } catch (error) {
      const formattedError = extractErrorMessages(error);

      return failedActionResponse(
        "Database error creating subject.",
        formattedError
      );
    }
  }
);

// MARK: Projects
export const createProjectFormAction = withFormAuth(
  async (
    userId: string,
    prevState: ActionResponse<ProjectSelector>,
    formData: FormData
  ) => {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const subjectId = formData.get("subjectId") as string;

    if (!name || name.length < 3) {
      return failedActionResponse("Name must be at least 3 characters.");
    }

    try {
      const newProject = (await prisma.$transaction(async (tx) => {
        const updatedSubject = await tx.subject.update({
          where: { id: subjectId, userId: userId },
          data: {
            projectSequence: { increment: 1 },
          },
        });

        const sequenceString = updatedSubject.projectSequence
          .toString()
          .padStart(6, "0");

        const readableId = `${updatedSubject.shortcode}${sequenceString}`;

        const project = await tx.project.create({
          data: {
            name,
            description,
            userId: userId,
            subjectId: updatedSubject.id,
            readableId: readableId,
            folders: {
              create: {
                name: "Root",
                isRoot: true,
                userId,
              },
            },
          },

          select: projectSelectorSelect,
        });

        return project;
      })) as ProjectSelector;

      revalidatePath("/projects");

      return successActionResponse(newProject, "Project successfully created.");
    } catch (error) {
      return failedActionResponse(`Database Error: ${error}`);
    }
  }
);

// MARK: Folders
export const createFolderFormAction = withFormAuth(
  async (
    userId: string,
    prevState: ActionResponse<FolderSelector>,
    formData: FormData
  ) => {
    const parsed = createFolderSchema.safeParse({
      projectId: formData.get("projectId"),
      parentId: formData.get("parentFolderId"),
      name: formData.get("name"),
    });

    if (!parsed.success) {
      return failedActionResponse(
        "Validation Failed",
        extractErrorMessages(parsed.error)
      );
    }

    const { projectId, parentId, name } = parsed.data;

    const parentFolder = await prisma.folder.findUnique({
      where: { id: parentId },
    });

    if (!parentFolder) {
      return failedActionResponse("Parent Folder Not Found");
    }

    const MAX_FOLDER_DEPTH = 3;

    if (parentFolder.depth >= MAX_FOLDER_DEPTH) {
      return failedActionResponse("Failed to Create Folder", [
        `Maximum folder depth of ${MAX_FOLDER_DEPTH} has been reached. This folder cannot contain any other folders.`,
      ]);
    }

    const depth = parentFolder.depth + 1;

    const newFolder = (await prisma.folder.create({
      data: {
        name,
        userId,
        projectId,
        parentId,
        depth,
      },
    })) as FolderSelector;

    revalidatePath("/projects");

    return successActionResponse(newFolder, "Folder created successfully.");
  }
);

// MARK: Files
