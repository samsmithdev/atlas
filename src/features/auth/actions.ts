"use server";

import { auth } from "auth";

export async function checkAuth() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized: You must be logged in to create a file.");
  }
}
