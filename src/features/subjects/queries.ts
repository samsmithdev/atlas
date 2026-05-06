import { successActionResponse } from "@/lib/actions/responses";
import { withAuth } from "@/lib/actions/wrapper";
import prisma from "@/lib/db";
import { SubjectSelector, subjectSelectorSelect } from "./types";

export const fetchSubjectSelectors = withAuth(async (userId) => {
  const result = (await prisma.subject.findMany({
    where: { userId },
    select: subjectSelectorSelect,
  })) as SubjectSelector[];

  return successActionResponse(
    result,
    "Subject selectors fetched successfully."
  );
});
