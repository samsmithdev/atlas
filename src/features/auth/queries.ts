"use server";

import { auth } from "@/auth";
import { ActionResponse } from "@/types/actions";
import { Session } from "next-auth";

export async function fetchAuth(): Promise<
  ActionResponse<{ userId: string; session: Session }>
> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  return {
    success: true,
    message: "Authenticated successfully",
    data: { userId, session },
  };
}
