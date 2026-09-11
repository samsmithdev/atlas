"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppRoutes } from "@/lib/routes";
import { useRouter } from "next/navigation";

export default function CreateSubjectProjectDropdown() {
  const router = useRouter();

  const handleCreateSubject = () => {
    router.push(AppRoutes.createSubjectModal());
  };

  const handleCreateProject = () => {
    router.push(AppRoutes.createProjectModal());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>New...</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem className="font-bold" onClick={handleCreateSubject}>
          New Subject
        </DropdownMenuItem>
        <DropdownMenuItem className="font-bold" onClick={handleCreateProject}>
          New Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
