"use client";

// React and NextJS Imports
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

// ATLAS Imports
import { FolderSelector } from "@/features/folders/types";
import { ActionResponse } from "@/lib/actions/types";
import { createFolderFormAction } from "../actions";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CornerDownLeft } from "lucide-react";

const initialState: ActionResponse<FolderSelector> = {
  message: "",
  success: false,
};

interface AtlasCreateFolderFormProps {
  projectId: string;
  parentId: string;
}

export default function AtlasCreateFolderForm({
  projectId,
  parentId,
}: AtlasCreateFolderFormProps) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    createFolderFormAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.back();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-4">
      <Input id="name" name="name" required />
      <input type="hidden" name="parentId" value={parentId} />
      <input type="hidden" name="projectId" value={projectId} />
      {!state.success && state.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          <CornerDownLeft
            className={isPending ? "opacity-10" : "opacity-100"}
          />
          {isPending ? "Saving..." : "Create Subject"}
        </Button>
      </div>
    </form>
  );
}
