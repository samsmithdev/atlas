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
import { SubjectSelector, subjectSelectorSelect } from "./types";

export const createSubjectFormAction = withFormAuth(
  async (
    userId: string,
    prevState: ActionResponse<SubjectSelector>,
    formData: FormData
  ) => {
    const name = formData.get("name") as string;
    const shortcode = formData.get("shortcode") as string;
    const description = formData.get("description") as string;

    if (!name || name.length < 3) {
      return failedActionResponse("Name must be at least 3 characters.");
    }

    try {
      const result = (await prisma.subject.create({
        data: {
          name,
          shortcode,
          description,
          userId,
        },
        select: subjectSelectorSelect,
      })) as SubjectSelector;

      revalidatePath("/projects");

      return successActionResponse(result);
    } catch (error) {
      return failedActionResponse("Database error creating subject.");
    }
  }
);
