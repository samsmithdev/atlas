import { withAuth } from "@/lib/action-wrapper";
import prisma from "@/lib/db";
import { SubjectSelector, subjectSelectorSelect } from "./types";

export const fetchSubjectSelectors = withAuth(async (userId) => {
  const result = (await prisma.subject.findMany({
    where: { userId },
    select: subjectSelectorSelect,
  })) as SubjectSelector[];

  return {
    success: true,
    message: "Subject selectors fetched successfully.",
    data: result,
  };
});
