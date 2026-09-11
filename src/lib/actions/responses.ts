import { ActionResponse } from "@/lib/actions/types";

export function successActionResponse<T>(
  data: T,
  message: string = "Action succeeded"
): ActionResponse<T> {
  return {
    success: true,
    message,
    data: JSON.parse(JSON.stringify(data)) as T,
  };
}

export function failedActionResponse<T = never>(
  message: string = "Action failed",
  errors?: string[]
): ActionResponse<T> {
  return {
    success: false,
    message,
    errors,
  };
}
