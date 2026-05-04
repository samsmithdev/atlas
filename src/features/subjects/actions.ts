"use server";

import prisma from "@/lib/db";
import { ActionResponse } from "@/types/actions";
import { revalidatePath } from "next/cache";

// Type Imports
import { withFormAuth } from "@/lib/action-wrapper";
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
      return { success: false, message: "Name must be at least 3 characters." };
    }

    const duplicateSubjectShortcode = await prisma.subject.findFirst({
      where: {
        shortcode,
        userId,
      },
    });

    if (duplicateSubjectShortcode) {
      return {
        success: false,
        message: `Shortcode must be unique. Duplicate shortcode found: ${duplicateSubjectShortcode.shortcode} - ${duplicateSubjectShortcode.name}`,
      };
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

      return {
        success: true,
        message: "Subject created successfully.",
        data: result,
      };
    } catch (error) {
      return { success: false, message: `Database error: ${error}` };
    }
  }
);
