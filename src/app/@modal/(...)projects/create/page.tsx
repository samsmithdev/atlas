// Project/subject creator Dialog
"use server";

import { fetchSubjectSelectors } from "@/features/subjects/queries";

export default async function AtlasCreateProjectModalPage() {
  const subjectSelectors = await fetchSubjectSelectors();
}
