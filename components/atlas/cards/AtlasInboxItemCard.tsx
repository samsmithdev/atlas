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
            <div 
                className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
                <div className="overflow-hidden">
                    <CardContent>

                    </CardContent>
                    <CardFooter>
                        
                    </CardFooter>
                </div>
            </div>
        </Card>
    )
}

/*
{/* 1. The outer div acts as the grid container. 
      It transitions smoothly between 0fr (collapsed) and 1fr (expanded).
    }
    <div 
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
    >
        {/* 2. The inner div must have overflow-hidden. 
          When the grid collapses to 0fr, this hides the content inside.
        }
        <div className="overflow-hidden">
            <CardContent>
                {/* Your content here }
            </CardContent>
            <CardFooter>
                {/* Your footer here }
            </CardFooter>
        </div>
    </div>
*/