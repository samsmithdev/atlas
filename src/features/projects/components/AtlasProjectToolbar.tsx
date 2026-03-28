"use client";

import AtlasProjectSelectorButton from "@/components/legacy/buttons/AtlasProjectSelectorButton";
import { AtlasProjectSelectorItem } from "@/types/AtlasSelectorTypes";
import AtlasNewItemButton from "./AtlasNewItemButton";
import AtlasSearchButton from "./AtlasSearchButton";

type AtlasProjectToolbarProps = {
  activeProject?: AtlasProjectSelectorItem;
};

export default function AtlasProjectToolbar({
  activeProject,
}: AtlasProjectToolbarProps) {
  return (
    <div
      id="atlas-project-toolbar-container"
      className="flex items-center gap-2 p-4"
    >
      <div className="shrink">
        <AtlasProjectSelectorButton activeProject={activeProject} />
      </div>

      <div className="shrink">
        <AtlasNewItemButton />
      </div>

      <div className="shrink">
        <AtlasSearchButton />
      </div>
    </div>
  );
}
