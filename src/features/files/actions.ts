"use server";

import { checkAuth } from "@/features/auth/queries";
import prisma from "@/lib/db";
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

export async function createFileFormTransaction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Get the session inside the action
  const { userId, session } = await checkAuth();

  // Extract the data
  const projectId = formData.get("projectId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const folderIdField = formData.get("folderId");
  const folderId = folderIdField ? (folderIdField as string) : null;

  if (!projectId || !name) {
    return { status: "error", message: "Files require a ProjectId and name." };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const updatedProject = await tx.project.update({
        where: { id: projectId },
        data: {
          fileSequence: { increment: 1 },
        },
      });

      const sequenceString = updatedProject.fileSequence
        .toString()
        .padStart(6, "0");
      const readableId = `${updatedProject.readableId}-${sequenceString}`;

      await tx.file.create({
        data: {
          name,
          description,
          userId: userId,
          folderId: folderId,
          projectId: updatedProject.id,
          readableId: readableId,
        },
      });
    });
    revalidatePath("/projects");
    return { status: "success", message: "File successfully created." };
  } catch (error) {
    return {
      status: "error",
      message: "DB Error attempting to create file...",
    };
  }
}

export async function updateFile(fileId: string, content: string) {
  const { userId, session } = await checkAuth();

  try {
    const updatedFile = await prisma.file.update({
      where: { id: fileId, userId: userId },
      data: {
        content: content,
      },
    });

    revalidatePath(`/projects/${updatedFile.projectId}/files/${fileId}`);

    return { success: true, data: updatedFile };
  } catch (error) {
    console.error("Failed to update file:", error);
    return { success: false, error: "failed to save" };
  }
}

export async function deleteFile(fileId: string) {
  const { userId, session } = await checkAuth();

  try {
    const deletedFile = await prisma.file.delete({
      where: {
        id: fileId,
        userId: userId,
      },
    });
    revalidatePath("/projects");
    return { success: true, data: deletedFile };
  } catch (error) {
    console.error("Failed to delete file:", error);
    return { success: false, error: error };
  }
}
