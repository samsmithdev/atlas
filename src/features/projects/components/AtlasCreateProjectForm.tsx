"use client";

// React and NextJS Imports
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

// ATLAS Import
import { createProjectFormAction } from "@/features/projects/actions";
import { ProjectSelector } from "@/features/projects/types";
import { SubjectSelector } from "@/features/subjects/types";
import { ActionResponse } from "@/types/actions";

// Shadcn UI Imports
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialState: ActionResponse<ProjectSelector> = {
  message: "",
  success: false,
};

interface AtlasCreateProjectFormProps {
  subjects: SubjectSelector[];
}

export default function AtlasCreateProjectForm({
  subjects,
}: AtlasCreateProjectFormProps) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    createProjectFormAction,
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
      <div className="space-y-2 scheme-dark">
        <Label htmlFor="subjectId">Parent Subject</Label>

        <Select name="subjectId" required>
          <SelectTrigger>
            <SelectValue placeholder="Select a Subject" />
          </SelectTrigger>

          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id}>
                {subject.readableName ?? "Test"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name">Project Name</Label>
        <Input id="name" name="name" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Project Description</Label>
        <Input id="description" name="description" />
      </div>
    </form>
  );
}
