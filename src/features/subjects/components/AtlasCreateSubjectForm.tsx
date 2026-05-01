"use client";

// React and NextJS Imports
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

// ATLAS Imports
import { createSubjectFormAction } from "@/features/subjects/actions";
import { SubjectSelector } from "@/features/subjects/types";
import { ActionResponse } from "@/types/actions";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AtlasCreateSubjectFormProps {}

const initialState: ActionResponse<SubjectSelector> = {
  message: "",
  success: false,
};

export default function AtlasCreateSubjectForm({}: AtlasCreateSubjectFormProps) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    createSubjectFormAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.back();
      // Add a toast?
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="shortcode">Shortcode</Label>
        <Input
          id="shortcode"
          name="shortcode"
          placeholder="e.g. CSE"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="name">Subject Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="e.g. Jarvis Project"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="What is this subject about?"
        />
      </div>

      {/* Render errors if the action failed */}
      {!state.success && state.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}

      {/* If you add an errors array to your ActionResponse later, you can map them here */}
      {/*!state.success &&
        state.errors?.map((err, idx) => (
          <p key={idx} className="text-sm text-red-500">
            {err}
          </p>
        ))*/}

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Create Subject"}
        </Button>
      </div>
    </form>
  );
}
