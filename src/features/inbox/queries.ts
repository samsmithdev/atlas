"use server";

import { checkAuth } from "@/features/auth/queries";
import prisma from "@/lib/db";

export async function fetchInboxItemTransaction() {
  const { userId, session } = await checkAuth();

  try {
    const inboxItems = await prisma.inboxItem.findMany({
      where: { userId: userId, actionTaken: null },
      select: {
        id: true,
        createdAt: true,
        content: true,
        status: true,
        assets: true,
      },
    });

    return { status: "success", data: inboxItems };
  } catch (error) {
    return {
      status: "error",
      message: "DB Error attempting to delete inbox item.",
    };
  }
}
