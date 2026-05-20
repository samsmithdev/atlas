// Project/subject creator Dialog
"use server";

import { fetchSubjectSelectors } from "@/features/workspace/queries";

import AtlasFormDialog from "@/components/atlas/layout/AtlasFormDialog";
import AtlasCreateProjectForm from "@/features/workspace/components/projects/AtlasCreateProjectForm";
import { AtlasCreateProjectSkeleton } from "@/features/workspace/components/projects/AtlasCreateProjectSkeleton";
import { Suspense } from "react";

async function FormLoader() {
  try {
    const subjectSelectors = await fetchSubjectSelectors();

    if (!subjectSelectors.success || !subjectSelectors.data) {
      throw Error();
    }

    const subjects = subjectSelectors.data;

    <AtlasCreateProjectForm subjects={subjects} />;
  } catch (error) {
    return <p>Error Loading Subjects</p>;
  }
}

export default async function AtlasCreateProjectModalPage() {
  return (
    <AtlasFormDialog
      title="Create a Project"
      description="An ATLAS Project is the primary grouping for tackling work."
    >
      <Suspense fallback={<AtlasCreateProjectSkeleton />}>
        <FormLoader />
      </Suspense>
    </AtlasFormDialog>
  );
}
