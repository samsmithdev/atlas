"use server";

import { fetchAuth } from "@/features/auth/queries";
import prisma from "@/lib/db";
import { ActionResponse } from "@/types/actions";
import { ProjectSelector, ProjectsGroupedBySubject } from "./types";

export async function fetchProjectSelectorsBySubject(): Promise<
  ActionResponse<ProjectsGroupedBySubject[]>
> {
  const result = await fetchAuth();

  if (!result.success || !result.data?.userId) {
    return { success: false, message: "Failed to authenticate user" };
  }

  const fetchedResults = await prisma.subject.findMany({
    where: {
      userId: result.data.userId,
    },
    select: {
      name: true,
      id: true,
      shortcode: true,
      description: true,
      projects: {
        select: {
          id: true,
          name: true,
          readableId: true,
          description: true,
        },
      },
    },
  });

  const convertedResults: ProjectsGroupedBySubject[] = fetchedResults.map(
    (projectsInSubject) => {
      const convertedProjectsGroupedBySubject: ProjectsGroupedBySubject = {
        subjectId: projectsInSubject.id,
        subjectName: projectsInSubject.name,
        subjectShortcode: projectsInSubject.shortcode,
        subjectDescription: projectsInSubject.description,
        projects: projectsInSubject.projects.map((project) => {
          const convertedProjectSelector: ProjectSelector = {
            ...project,
          };

          return convertedProjectSelector;
        }),
      };

      return convertedProjectsGroupedBySubject;
    }
  );

  return {
    success: true,
    message: "Successfully fetched project selectors by subject!",
    data: convertedResults,
  };
}
