// Project/subject creator Dialog
"use server";

import AtlasFormDialog from "@/components/layout/AtlasFormDialog";
import AtlasCreateProjectFormContainer from "@/features/workspace/components/projects/AtlasCreateProjectFormContainer";
import { AtlasCreateProjectSkeleton } from "@/features/workspace/components/projects/AtlasCreateProjectSkeleton";
import { Suspense } from "react";

export default async function AtlasCreateProjectModalPage() {
  return (
    <AtlasFormDialog
      title="Create a Project"
      description="An ATLAS Project is the primary grouping for tackling work."
    >
      <Suspense fallback={<AtlasCreateProjectSkeleton />}>
        <AtlasCreateProjectFormContainer />
      </Suspense>
    </AtlasFormDialog>
  );
}
