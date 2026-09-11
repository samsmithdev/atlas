"use client";

// React and NextJS Imports
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

// ATLAS Imports
import { createFileFormAction } from "@/features/workspace/actions";
import { FileSelector } from "@/features/workspace/types";
import { ActionResponse } from "@/lib/actions/types";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CornerDownLeft } from "lucide-react";

const initialState: ActionResponse<FileSelector> = {
  message: "",
  success: false,
};

interface AtlasCreateFileFormProps {
  projectId: string;
  folderId: string;
}

export default function AtlasCreateFileForm({
  projectId,
  folderId,
}: AtlasCreateFileFormProps) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    createFileFormAction,
    initialState
  );

  // Maybe a modal item thing?
  // TODO: Verify this
  useEffect(() => {
    if (state.success) {
      router.back();
    }
  }, [state.success, router]);

  // DECISION: This form will just be to create a file inside of the directory without a full modal. The editor will have a File Details pane that can be put in on the right of a file, or the list item can be right-clicked, or maybe a hotkey?

  return (
    <form action={formAction} className="space-y-4">
      <Input id="name" name="name" required />
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="folderId" value={folderId} />

      {!state.success && state.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          <CornerDownLeft
            className={isPending ? "opacity-10" : "opacity-100"}
          />
          {isPending ? "Saving..." : "Create File"}
        </Button>
      </div>
    </form>
  );
}
