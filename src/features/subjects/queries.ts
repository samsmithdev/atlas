import { withAuth } from "@/lib/action-wrapper";
import prisma from "@/lib/db";
import { subjectSelectorSelect } from "./types";

export const fetchSubjectSelectors = withAuth(async (userId) => {
  const result = await prisma.subject.findMany({
    where: { userId },
    select: subjectSelectorSelect,
  });

  return {
    success: true,
    message: "Subject selectors fetched successfully.",
    data: result,
  };
});
