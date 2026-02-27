'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { AtlasItemType, AtlasListGroup, AtlasProjectNavigatorItems } from "@/types/AtlasListTypes";
import { Scroll } from "lucide-react";
import AtlasSubjectWithProjectLinksCard from "../cards/AtlasSubjectWithProjectLinksCard";
import { useOptimistic, startTransition } from 'react';
import { deleteSubject } from "@/actions/subjects";


interface AtlasProjectSelectorSubjectCardPaneProps {
    projectNavigatorItems: AtlasListGroup[];
}

export default function AtlasProjectSelectorSubjectCardPane({projectNavigatorItems}: AtlasProjectSelectorSubjectCardPaneProps) {

    const [optimisticSubjectItems, removeOptimisticSubject] = useOptimistic(
        projectNavigatorItems,
        (currentSubjects, subjectIdToRemove: string) => {
            return currentSubjects.filter(subject => subject.id !== subjectIdToRemove)
        }
    );

    const handleDeleteSubjectRequest = async (subjectId: string) => {
        startTransition(() => {
            removeOptimisticSubject(subjectId);
        });

        const result = await deleteSubject(subjectId);

        if (!result.success) {
            console.error("Failed to delete");
        }
    }

    return (
        <ScrollArea className='w-full h-full'>
            <div className='w-full h-full py-6 px-4'>
                <ul className='columns-1 md:columns-2 gap-6 space-y-6'>
                {(projectNavigatorItems ?
                    (projectNavigatorItems.sort((a, b) => a.header.localeCompare(b.header)).map((subject) => (
                        <li key={subject.id} className='break-inside-avoid'><AtlasSubjectWithProjectLinksCard 
                        key={subject.id} 
                        subjectName={subject.header} 
                        subjectDescription={subject.description ?? ''} subjectId={subject.id} projects={subject.listItems} 
                        onDelete={handleDeleteSubjectRequest}
                        className='w-full shrink'
                        /></li>
                    ))) : 
                    (<p></p>))}
                    </ul>
                    </div>
        </ScrollArea>
    );
}

// <div className="flex flex-col flex-col-2 gap-8">
// </div>