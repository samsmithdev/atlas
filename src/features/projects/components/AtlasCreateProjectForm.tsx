"use client";

// React and NextJS Imports
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";

// ATLAS Imports
import { ActionState, createProjectFormTransaction } from "@/actions/projects";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type CreateProjectformProps = {
  subjects: SubjectSelectorItem[];
};

const initialState: ActionState = {
  message: "",
  status: "idle",
};

export default function AtlasCreateProjectForm({
  subjects,
}: CreateProjectformProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [state, formAction, isPending] = useActionState(
    createProjectFormTransaction,
    initialState
  );

  // Effect: Close modal on success
  useEffect(() => {
    if (state.status === "success") {
      const params = new URLSearchParams(searchParams);
      params.delete("action-modal");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [state.status, router, pathname, searchParams]);

  return (
    <form action={formAction} className="space-y-4 scheme-dark">
      <div className="space-y-2 scheme-dark">
        <Label htmlFor="subjectId">Parent Subject</Label>

        <Select name="subjectId" required>
          <SelectTrigger>
            <SelectValue placeholder="Select a Subject" />
          </SelectTrigger>

          <SelectContent className="scheme-dark">
            {subjects.map((subject) => (
              <SelectItem
                key={subject.id}
                value={subject.id}
                className="scheme-dark"
              >
                {subject.shortcode} - {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="e.g. Kitchen Timer Voice Assistant"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="What is the project about?"
        />
      </div>

      {state.status === "error" && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
