import { fetchAuth } from "@/features/auth/queries";
import { ActionResponse } from "@/types/actions";

export function withAuth<T>(
  actionFunction: (userId: string) => Promise<ActionResponse<T>>
) {
  return async function (): Promise<ActionResponse<T>> {
    const authResult = await fetchAuth();

    if (!authResult.success || !authResult.data) {
      return {
        success: false,
        message: authResult.message || "Missing authentication information.",
        errors: authResult.errors,
      };
    }

    return actionFunction(authResult.data.userId);
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
        message: authResult.message || "Missing authentication information.",
      };
    }

    return actionFunction(authResult.data.userId, prevState, formData);
  };
}
