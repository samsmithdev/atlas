"use server";

import { ActionResponse } from "@/lib/actions/types";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

// Type Imports
import {
  failedActionResponse,
  successActionResponse,
} from "@/lib/actions/responses";
import { withFormAuth } from "@/lib/actions/wrapper";
import { ProjectSelector, projectSelectorSelect } from "./types";

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
