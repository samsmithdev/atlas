"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface AtlasInboxProcessingPanelProps {

}

export default function AtlasInboxProcessingPanel({}: AtlasInboxProcessingPanelProps) {
    return (
        <ResizablePanelGroup 
            orientation="horizontal"
            className="max-w-sm rounded-lg border"
        >
            <ResizablePanel defaultSize="35%">
                {/* The inbox panel */}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="65%">
                { /* the navigation for file landing */}
            </ResizablePanel>

        </ResizablePanelGroup>
    )
}