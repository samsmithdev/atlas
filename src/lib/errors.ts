import { ZodError } from "zod";

export function extractErrorMessages(error: unknown): string[] {
  // 1. Handle Zod validation errors (returns an array of specific field issues)
  if (error instanceof ZodError) {
    return error.issues.map((e) => e.message);
  }

  // 2. Handle standard JavaScript Error objects
  if (error instanceof Error) {
    return [error.message];
  }

  // 3. Handle cases where someone threw a raw string (e.g., throw "Something broke")
  if (typeof error === "string") {
    return [error];
  }

  // 4. The ultimate fallback for truly weird edge cases
  return ["An unexpected error occurred. Please try again."];
}
