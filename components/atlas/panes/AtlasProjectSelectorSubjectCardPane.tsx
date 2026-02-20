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
        <ScrollArea>
            <div className="flex flex-col flex-col-2 gap-2">
                {(projectNavigatorItems ?
                    (projectNavigatorItems.map((subject) => (
                        <AtlasSubjectWithProjectLinksCard key={subject.id} subjectName={subject.header} subjectDescription={subject.description ?? ''} subjectId={subject.id} projects={subject.listItems} onDelete={handleDeleteSubjectRequest}/>
                    ))) : 
                    (<p></p>))}
            </div>
        </ScrollArea>
    );
}