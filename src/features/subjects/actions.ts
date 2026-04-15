"use server";

import { fetchAuth } from "@/features/auth/queries";
import prisma from "@/lib/db";
import { ActionResponse } from "@/types/actions";
import { revalidatePath } from "next/cache";

// Type Imports
import { SubjectSelector } from "./types";

export async function createSubjectFormAction(
  prevState: ActionResponse<SubjectSelector>,
  formData: FormData
): Promise<ActionResponse<SubjectSelector>> {
  const authResult = await fetchAuth();

  if (!authResult.success) {
    return {
      success: false,
      message: `Authentication error: ${authResult.message}`,
      errors: authResult.errors,
    };
  } else if (!authResult.data) {
    return {
      success: false,
      message: "Missing authentication information.",
    };
  }

  const { userId } = authResult.data;

  // Extract the data
  const name = formData.get("name") as string;
  const shortcode = formData.get("shortcode") as string;
  const description = formData.get("description") as string;

  // Check for any subjects that already have that shortcode for this user
  const duplicateSubjectShortcode = await prisma.subject.findUnique({
    where: {
      shortcode,
      userId,
    },
  });

  if (!name || name.length < 3) {
    return { success: false, message: "Name must be at least 3 characters." };
  } else if (duplicateSubjectShortcode) {
    return {
      success: false,
      message: `Shortcode must be unique. Duplicate shortcode found: ${duplicateSubjectShortcode.shortcode} - ${duplicateSubjectShortcode.name}`,
    };
  }

  try {
    const result = await prisma.subject.create({
      data: {
        name,
        shortcode,
        description,
        userId,
      },
    });

    revalidatePath("/projects");

    const formattedData: SubjectSelector = {
      ...result,
    };

    return {
      success: true,
      message: "Subject created successfully.",
      data: formattedData,
    };
  } catch (error) {
    return { success: false, message: `Database error: ${error}` };
  }
}
