import { subjectSelectorSelect } from "@/features/subjects/types";
import { withAuth } from "@/lib/action-wrapper";
import prisma from "@/lib/db";
import { projectSelectorSelect } from "./types";

export const fetchProjectSelectorsBySubject = withAuth(async (userId) => {
  const result = await prisma.project.findMany({
    where: { userId },
    select: {
      ...projectSelectorSelect,
      subject: {
        select: subjectSelectorSelect,
      },
    },
    orderBy: [
      { subject: { shortcode: "asc" } },
      { subject: { name: "asc" } },
      { readableId: "asc" },
    ],
  });

  const safeProjects = JSON.parse(JSON.stringify(result));

  return {
    success: true,
    message: "Project selectors fetched successfully.",
    data: safeProjects,
  };
});
