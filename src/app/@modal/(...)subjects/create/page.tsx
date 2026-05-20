"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import AtlasCreateSubjectForm from "@/features/workspace/components/subjects/AtlasCreateSubjectForm";
import { useRouter } from "next/navigation";

export default function CreateSubjectModal() {
  const router = useRouter();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      router.back();
    }
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Create a Subject</DialogTitle>
          <DialogDescription>
            An ATLAS Subject is the top-level organizer for any projects and
            files that fit the topic. For example, a C - Cooking subject could
            hold a project for Recipes, Utensils, Techniques, etc.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea>
          <AtlasCreateSubjectForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
