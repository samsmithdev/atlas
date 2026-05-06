import { fetchAuth } from "@/features/auth/queries";
import { failedActionResponse } from "./responses";
import { ActionResponse } from "./types";

export function withAuth<T, Args extends unknown[]>(
  actionFunction: (userId: string, ...args: Args) => Promise<ActionResponse<T>>
) {
  return async function (...args: Args): Promise<ActionResponse<T>> {
    const authResult = await fetchAuth();

    if (!authResult.success || !authResult.data) {
      return failedActionResponse("Missing authentication information.");
    }

    try {
      return await actionFunction(authResult.data.userId, ...args);
    } catch (error) {
      console.error("[SERVER ACTION ERROR]:", error);

      return failedActionResponse("An unexpected server error occurred.", [
        String(error),
      ]);
    }
  };
}

export function withFormAuth<T>(
  actionFunction: (
    userId: string,
    prevState: T,
    formData: FormData
  ) => Promise<T>
) {
  return async function (prevState: T, formData: FormData): Promise<T> {
    const authResult = await fetchAuth();

    if (!authResult.success || !authResult.data) {
      return {
        ...prevState,
        success: false,
        message: `Authentication Error: ${authResult.message} - ${authResult.errors}`,
      };
    }

    return actionFunction(authResult.data.userId, prevState, formData);
  };
}
