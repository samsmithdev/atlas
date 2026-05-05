"use server";

import prisma from "@/lib/db";
import { ActionResponse } from "@/types/actions";
import { revalidatePath } from "next/cache";

// Type Imports
import { withFormAuth } from "@/lib/action-wrapper";
import { ProjectSelector, projectSelectorSelect } from "./types";

export const createProjectFormAction = withFormAuth(
  async (
    userId: string,
    prevState: ActionResponse<ProjectSelector>,
    formData: FormData
  ) => {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const subjectId = formData.get("parentSubjectId") as string;

    if (!name || name.length < 3) {
      return { success: false, message: "Name must be at least 3 characters." };
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

      return {
        success: true,
        message: "Project successfully created.",
        data: newProject,
      };
    } catch (error) {
      return { success: false, message: `Database error: ${error}` };
    }
  }
);
