// Project/subject creator Dialog
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import React from "react";

interface AtlasFormDialogProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export default function AtlasFormDialog({
  children,
  title,
  description,
}: AtlasFormDialogProps) {
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
          <DialogTitle>{title}</DialogTitle>
          {!!description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        <ScrollArea>{children}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
