// Project/subject creator Dialog
"use server";

import { fetchSubjectSelectors } from "@/features/subjects/queries";

import AtlasFormDialog from "@/components/atlas/layout/AtlasFormDialog";
import AtlasCreateProjectForm from "@/features/projects/components/AtlasCreateProjectForm";

export default async function AtlasCreateProjectModalPage() {
  const subjectSelectors = await fetchSubjectSelectors();

  if (!subjectSelectors.success || !subjectSelectors.data) {
    return <div>Error fetching subject selectors</div>;
  }

  const subjects = subjectSelectors.data;

  return (
    <AtlasFormDialog
      title="Create a Project"
      description="An ATLAS Project is the primary grouping for tackling work."
    >
      <AtlasCreateProjectForm subjects={subjects} />
    </AtlasFormDialog>
  );
}
