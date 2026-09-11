import { ScrollArea } from "@/components/ui/scroll-area";
import AtlasSubjectWithProjectLinksCard from "@/features/workspace/components/subjects/AtlasSubjectWithProjectLinksCard";
import { SubjectWithProjectSelectors } from "@/features/workspace/types";

interface AtlasSelectProjectPanelProps {
  subjectSelectorsWithProjects: SubjectWithProjectSelectors[];
}

export default function AtlasSelectProjectPanel({
  subjectSelectorsWithProjects,
}: AtlasSelectProjectPanelProps) {
  console.log("[SelectProjectPanel] Subjects:", subjectSelectorsWithProjects);
  return (
    <div id="atl-select-project-panel" className="w-full h-full border-r">
      <ScrollArea className="w-full h-full p-6">
        <ul className="grid grid-cols-1 md:grid-cols-2 xl-grid-cols-3 gap-6 max-w-6xl mx-auto">
          {subjectSelectorsWithProjects.map((subjectWithProjects) => (
            <AtlasSubjectWithProjectLinksCard
              subject={subjectWithProjects}
              key={subjectWithProjects.id}
            />
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
