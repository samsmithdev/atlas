"use client";

import { cn } from "@/lib/utils";
import { AtlasProjectSelectorItem } from "@/types/AtlasSelectorTypes";
import AtlasSearchButton from "../../../features/projects/components/AtlasSearchButton";
import AtlasNewItemButton from "../buttons/AtlasNewItemButton";
import AtlasProjectSelectorButton from "../buttons/AtlasProjectSelectorButton";

interface AtlasProjectHeaderProps {
  projectSelectorItems?: AtlasProjectSelectorItem[];
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
