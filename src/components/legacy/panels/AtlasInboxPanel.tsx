"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"
import { AtlasInboxItem } from "@/types/AtlasListTypes";

interface AtlasInboxPanelProps {
    inboxItems: AtlasInboxItem[];
    activeItemId: string;
    updateActiveItemId: (itemId: string) => void;
}

export default function AtlasInboxPanel({ inboxItems, activeItemId, updateActiveItemId }: AtlasInboxPanelProps) {


    return (
        <ScrollArea>
            <Accordion 
                type="single"
                collapsible
                className=""
                defaultValue={activeItemId}
                onValueChange={updateActiveItemId}
            >
                {inboxItems.length > 0 && inboxItems.map((inboxItem) => (
                    <AccordionItem key={inboxItem.id} value={inboxItem.id}>
                        <AccordionTrigger>{`Inbox Item - ${inboxItem.createdAt}`}</AccordionTrigger>
                        <AccordionContent>{inboxItem.content}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </ScrollArea>
    )
}