"use server";

import { auth } from "@/auth";
import {
  failedActionResponse,
  successActionResponse,
} from "@/lib/actions/responses";
import { ActionResponse } from "@/lib/actions/types";
import { Session } from "next-auth";

export async function fetchAuth(): Promise<
  ActionResponse<{ userId: string; session: Session }>
> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return failedActionResponse("Unauthorized");
  }

  return successActionResponse(
    { userId, session },
    "Authenticated successfully."
  );
}
