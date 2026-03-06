'use client';

import { Button } from "@/components/ui/button";
import { 
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { useState } from "react";

enum AtlasInboxItemActionTypes {
    APPEND,
    PREPEND,
    CREATE_NEW,
    DELETE
}

interface AtlasInboxItemCardProps {
    itemHeader: string;
    itemContent: string;
    itemSummary: string;
    itemId: string;
    isActive: boolean;
    onDelete: (id: string) => void;
}

export default function AtlasInboxItemCard({ itemHeader, itemContent, itemSummary, itemId, isActive, onDelete }: AtlasInboxItemCardProps) {
    const [isExpanded, setIsExpanded] = useState(isActive);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{itemHeader}</CardTitle>
                <CardDescription>{itemSummary}</CardDescription>
                <CardAction><Button size='xs' variant='destructive' onClick={() => onDelete(itemId)}>X</Button></CardAction>
            </CardHeader>
            {isExpanded && (
                <>
                    <CardContent>{itemContent}</CardContent>
                    <CardFooter>To Be Added Later :P</CardFooter>
                </>
            )}
        </Card>
    )
}