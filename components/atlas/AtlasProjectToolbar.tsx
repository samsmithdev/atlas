'use client'

import { fetchProjectSelector } from "@/actions/projects";
import AtlasProjectSelectorButton from "@/components/atlas/buttons/AtlasProjectSelectorButton"
import { AtlasProjectSelectorItem } from "@/types/AtlasSelectorTypes";
import AtlasNewItemButton from "./buttons/AtlasNewItemButton";

type AtlasProjectToolbarProps = {
    activeProject?: AtlasProjectSelectorItem;
}

export default function AtlasProjectToolbar({ activeProject }: AtlasProjectToolbarProps) {
    return (
        <div
            id="atlas-project-toolbar-container"
            className="flex items-center gap-2 p-4 bg-black"
        >
            <div className="shrink">
                <AtlasProjectSelectorButton activeProject={activeProject} />
            </div>

            <div className="shrink">
                <AtlasNewItemButton />
            </div>
        </div>
    )
}