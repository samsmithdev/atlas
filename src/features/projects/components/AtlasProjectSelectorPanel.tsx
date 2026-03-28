"use client";

import AtlasLinkCard, { CardLinkData } from "@/components/atlas/AtlasLinkCard";
import { deleteProject } from "@/features/projects/actions";
import {
  ProjectSelector,
  ProjectsGroupedBySubject,
} from "@/features/projects/types";
import { deleteSubject } from "@/features/subjects/actions";

interface AtlasProjectSelectorPanelProps {
  projectsInSubjects: ProjectsGroupedBySubject[];
}

export default function AtlasProjectSelectorPanel({
  projectsInSubjects,
}: AtlasProjectSelectorPanelProps) {
  const convertProjectSelectorToCardLinkData = (project: ProjectSelector) => {
    const newCardLinkData: CardLinkData = {
      id: project.id,
      linkText: `${project.readableId} ${project.name}`,
      linkUrl: `/projects/${project.id}`,
      onDelete: async () => {
        const result = await deleteProject(project.id);

        if (result.success) {
          return {
            success: true,
            message: "Successfully deleted the project!",
          };
        }
        return {
          success: false,
          message: "Failed to delete the project.",
          errors: [String(result.errors)],
        };
      },
    };

    return newCardLinkData;
  };

  return projectsInSubjects.length > 0 ? (
    <div>
      {projectsInSubjects.map((projectsInSubject) => (
        <AtlasLinkCard
          key={projectsInSubject.subjectId}
          cardHeader={projectsInSubject.subjectName}
          onHeaderItemDelete={async () => {
            const result = await deleteSubject(projectsInSubject.subjectId);

            if (!result.success) {
              return {
                success: false,
                message: "Failed to delete the subject",
              };
            } else {
              return {
                success: true,
                message: "Successfully deleted subject",
                data: result.data,
              };
            }
          }}
          cardDescription={projectsInSubject.subjectDescription}
          cardLinkData={projectsInSubject.projects.map((projectSelector) =>
            convertProjectSelectorToCardLinkData(projectSelector)
          )}
          className={""}
        />
      ))}
    </div>
  ) : (
    <div>
      <p>No projects found.</p>
    </div>
  );
}
