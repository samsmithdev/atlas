import { ScrollArea } from "@/components/ui/scroll-area";
import { AtlasItemType, AtlasListGroup, AtlasProjectNavigatorItems } from "@/types/AtlasListTypes";
import { Scroll } from "lucide-react";
import AtlasSubjectWithProjectLinksCard from "../cards/AtlasSubjectWithProjectLinksCard";


interface AtlasProjectSelectorSubjectCardPaneProps {
    projectNavigatorItems: AtlasListGroup[];
}

export default function AtlasProjectSelectorSubjectCardPane({projectNavigatorItems}: AtlasProjectSelectorSubjectCardPaneProps) {

    return (
        <ScrollArea>
            <div className="flex flex-col flex-col-2 gap-2">
                {(projectNavigatorItems ?
                    (projectNavigatorItems.map((subject) => (
                        <AtlasSubjectWithProjectLinksCard subjectName={subject.header} subjectDescription={subject.description ?? ''} subjectId={subject.id} projects={subject.listItems} onDelete={() => subject.onDelete(subject.id, AtlasItemType.Subject)}/>
                    ))) : 
                    (<p></p>))}
            </div>
        </ScrollArea>
    );
}