import { subjectSelectorSelect } from "@/features/subjects/types";
import { successActionResponse } from "@/lib/actions/responses";
import { withAuth } from "@/lib/actions/wrapper";
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

  return successActionResponse(
    result,
    "Project Selectors fetched successfully."
  );
});
