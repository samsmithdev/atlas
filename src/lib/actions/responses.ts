import { ActionResponse } from "@/lib/actions/types";

export function successActionResponse<T>(
  data?: T,
  message: string = "Action succeeded"
): ActionResponse<T> {
  return {
    success: true,
    message,
    data: data ? JSON.parse(JSON.stringify(data)) : undefined,
  };
}

export function failedActionResponse(
  message: string = "Action failed",
  errors?: string[]
): ActionResponse {
  return {
    success: false,
    message,
    errors,
  };
}
