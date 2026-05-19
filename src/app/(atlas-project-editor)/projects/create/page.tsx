// Fallback subject/project create page
"use server";

import { fetchSubjectSelectors } from "@/features/workspace/queries";

import AtlasCreateProjectForm from "@/features/workspace/components/projects/AtlasCreateProjectForm";

export default async function AtlasCreateProjectPage() {
  const subjectSelectors = await fetchSubjectSelectors();

  if (!subjectSelectors.success || !subjectSelectors.data) {
    return <div>Error fetching subject selectors</div>;
  }

  const subjects = subjectSelectors.data;

  return (
    <div>
      <h1>Create a Project</h1>
      <AtlasCreateProjectForm subjects={subjects} />
    </div>
  );
}
