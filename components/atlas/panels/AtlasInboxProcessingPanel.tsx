"use client";

import { cn } from "@/lib/utils";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import AtlasInboxItemPanel from "./AtlasInboxItemPanel";
import { AtlasInboxItem } from "@/types/AtlasListTypes";
import { useState } from "react";
import AtlasInboxPanel from "./AtlasInboxPanel";

type AtlasInboxItemForProcessingPanel = {
    itemHeader: string;
    itemContent: string;
    itemSummary: string;
    itemId: string;
}

interface AtlasInboxProcessingPanelProps {
    inboxItems: AtlasInboxItem[];
    className?: string;
}

export default function AtlasInboxProcessingPanel({ inboxItems, className }: AtlasInboxProcessingPanelProps) {
    const [activeInboxItemId, setActiveInboxItemId] = useState((inboxItems.length > 0) ? inboxItems[0].id : "");

    const changeActiveInboxItem = (newActiveItemId: string) => {
        setActiveInboxItemId(newActiveItemId);
    }

    return (
        <ResizablePanelGroup 
            orientation="horizontal"
            className={cn("rounded-none border-primary border-2 shadow-accent shadow-2xl", className)}
        >
            <ResizablePanel defaultSize="35%">
                {/* The inbox panel */}
                <AtlasInboxPanel inboxItems={inboxItems} activeItemId={activeInboxItemId} updateActiveItemId={changeActiveInboxItem} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="65%">
                { /* the navigation for file landing */}
            </ResizablePanel>

        </ResizablePanelGroup>
    )
}