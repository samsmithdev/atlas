"use server";

import { checkAuth, fetchAuth } from "@/features/auth/queries";
import prisma from "@/lib/db";
import { ActionResponse } from "@/types/actions";
import { Project } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type ActionState = {
  message: string;
  status: "success" | "error" | "idle";
  errors?: {
    name?: string[];
    shortcode?: string[];
    description?: string[];
  };
};

export async function createProjectFormTransaction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Get the session inside the action
  const { userId, session } = await checkAuth();

  // Extract the data
  const subjectId = formData.get("subjectId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  // Basic validation, will consider Zod in the future
  if (!subjectId || !name) {
    return {
      status: "error",
      message: "Projects require a subjectId and name.",
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
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

      await tx.project.create({
        data: {
          name,
          description,
          userId: userId,
          subjectId: updatedSubject.id,
          readableId: readableId,
        },
      });
    });
    revalidatePath("/projects");

    return { status: "success", message: "Project successfully created." };
  } catch (error) {
    return { status: "error", message: "Project creation DB error..." };
  }
}

export async function updateProject(
  projectId: string,
  data: {
    name?: string;
    description?: string;
    addFieldIds?: string[];
    removeFieldIds?: string[];
    deleteFieldIds?: string[];
  }
) {
  // Get the session inside the action
  const { userId, session } = await checkAuth();
  try {
    const updatedProject = await prisma.project.update({
      where: { id: projectId, userId: userId },
      data: {
        name: data.name,
        description: data.description,
        files: {
          connect: data.addFieldIds?.map((id) => ({ id })),
          disconnect: data.removeFieldIds?.map((id) => ({ id })),
        },
      },
      include: {
        files: true,
      },
    });

    return { success: true, data: updatedProject };
  } catch (error) {
    console.error("Failed to update project relations:", error);
    return { success: false, error: "Failed to update project" };
  }
}

// MARK: Delete Projects

export async function deleteProject(
  projectId: string
): Promise<ActionResponse<Project>> {
  const result = await fetchAuth();

  if (!result.success || !result.data?.userId) {
    return { success: false, message: "Failed to authenticate user." };
  }

  try {
    const deletedProject = await prisma.project.delete({
      where: {
        id: projectId,
        userId: result.data.userId,
      },
    });
    revalidatePath("/projects");
    return {
      success: true,
      message: "Successfully deleted project.",
      data: deletedProject,
    };
  } catch (error) {
    console.error("Failed to delete th eproject:", error);
    return {
      success: false,
      message: "Failed to delete the project",
      errors: [String(error)],
    };
  }
}
