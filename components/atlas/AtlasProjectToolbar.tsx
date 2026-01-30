'use client'

import { fetchProjectSelector } from "@/actions/projects";
import AtlasProjectSelectorButton from "@/components/atlas/buttons/AtlasProjectSelectorButton"
import { AtlasProjectSelectorItem } from "@/types/AtlasSelectorTypes";

type AtlasProjectToolbarProps = {
    activeProject?: AtlasProjectSelectorItem;
}

export default function AtlasProjectToolbar({ activeProject }: AtlasProjectToolbarProps) {
    return (
        <div 
        id="atlas-project-toolbar-container"
        className="grid grid-row gap-5 pl-4 pt-4 pb-4 pr-4"
        >
        <div className="shrink">
            <AtlasProjectSelectorButton activeProject={activeProject}/>
        </div>
        </div>
    )
}