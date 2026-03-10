// A single column list with one expanded card at a time
'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardAction, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import AtlasInboxItemCard from "../cards/AtlasInboxItemCard";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type AtlasInboxItemForProcessingPanel = {
    itemHeader: string;
    itemContent: string;
    itemSummary: string;
    itemId: string;
}



interface AtlasInboxItemPanelProps {
    inboxItems: AtlasInboxItemForProcessingPanel[];
    className?: string;
}

export default function AtlasInboxItemPanel({ className }: AtlasInboxItemPanelProps) {
    const QUERY_PARAM_NAME = "active_item";
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeInboxItemId = searchParams.get(QUERY_PARAM_NAME);

    const clearActiveInboxItemId = () => {
        const params = new URLSearchParams(searchParams);
        params.delete(QUERY_PARAM_NAME);
        router.replace(`${pathname}?${params.toString()}`)
    }

    const updateActiveInboxItemId = (itemId: string) => {
        const params = new URLSearchParams(searchParams);
        
        if (itemId) {
            params.set(QUERY_PARAM_NAME, itemId);
            router.replace(`${pathname}?${params.toString()}`)
        } else {
            clearActiveInboxItemId();
        }
    }
    

    return (
        <ScrollArea id="atlas-inbox-item-panel" className={cn("", className)}>
            <ul className="">
                <li key="dev-1">
                    <AtlasInboxItemCard itemHeader={"Dev 1"} itemContent={"Dev 1 full content"} itemSummary={"Dev 1 summary"} itemId={"dev-1-1"} isActive={false} onDelete={function (id: string): void {
                        throw new Error("Function not implemented.");
                    } } />
                </li>
            </ul>

        </ScrollArea>
    )
}