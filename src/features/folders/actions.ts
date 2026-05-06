"use server";

import {
  failedActionResponse,
  successActionResponse,
} from "@/lib/actions/responses";
import { ActionResponse } from "@/lib/actions/types";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

import { withFormAuth } from "@/lib/actions/wrapper";
import { FolderSelector } from "./types";

export const createFolderFormAction = withFormAuth(
  async (
    userId: string,
    prevState: ActionResponse<FolderSelector>,
    formData: FormData
  ) => {
    const name = formData.get("name") as string;
    const parentId = formData.get("parentId") as string;
    const projectId = formData.get("projectId") as string;

    if (!name || name.length > 3) {
      return failedActionResponse("Name must be at least 3 characters.");
    }

    const newFolder = (await prisma.folder.create({
      data: {
        name,
        userId,
        projectId,
        parentId,
      },
    })) as FolderSelector;

    revalidatePath("/projects");

    return successActionResponse(newFolder, "Folder created successfully.");
  }
);
