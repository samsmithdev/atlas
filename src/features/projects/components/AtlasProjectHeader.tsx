"use client";

import AtlasProjectSelectorButton from "@/components/legacy/buttons/AtlasLegacyProjectSelectorButton";
import { cn } from "@/lib/utils";
import AtlasSearchButton from "../../../features/projects/components/AtlasSearchButton";
import { ProjectsGroupedBySubject } from "../types";
import AtlasNewItemButton from "./AtlasNewItemButton";

interface AtlasProjectHeaderProps {
  projectSelectorItems?: ProjectsGroupedBySubject[];
  className?: string;
}

export default function AtlasProjectHeader({
  projectSelectorItems,
  className,
}: AtlasProjectHeaderProps) {
  return (
    <header
      id="atlas-project-header-container"
      className={cn(
        // Internal layout
        "flex flex-row",
        className
      )}
    >
      <AtlasProjectSelectorButton projectSelectors={projectSelectorItems} />
      <AtlasNewItemButton />
      <AtlasSearchButton />
    </header>
  );
}
