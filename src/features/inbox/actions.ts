"use server";

import { checkAuth } from "@/features/auth/queries";
import prisma from "@/lib/db";
import { InboxAction } from "@prisma/client";
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

export async function createInboxItem(content?: string) {
  const { userId, session } = await checkAuth();

  try {
    await prisma.inboxItem.create({
      data: {
        content: content,
        userId: userId,
      },
    });
  } catch {}
}

export async function deleteInboxItemTransaction(inboxItemId: string) {
  const { userId, session } = await checkAuth();

  try {
    await prisma.$transaction(async (tx) => {
      const updatedInboxItem = await tx.inboxItem.update({
        where: { id: inboxItemId, userId: userId },
        data: {
          actionTaken: InboxAction.DELETED,
        },
      });
    });

    revalidatePath("/projects/inbox");
    return { status: "success", message: "Inbox item successfully deleted." };
  } catch (error) {
    return {
      status: "error",
      message: "DB Error attempting to delete inbox item.",
    };
  }
}
