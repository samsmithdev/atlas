"use server";

import AtlasFormDialog from "@/components/layout/AtlasFormDialog";
import AtlasSelectProjectPanelContainer from "@/features/workspace/components/projects/AtlasSelectProjectPanelContainer";
import AtlasSelectProjectPanelSkeleton from "@/features/workspace/components/projects/AtlasSelectProjectPanelSkeleton";
import { Suspense } from "react";

export default async function AtlasSelectProjectModalPage() {
  return (
    <AtlasFormDialog title="Select a Project">
      <Suspense fallback={<AtlasSelectProjectPanelSkeleton />}>
        <AtlasSelectProjectPanelContainer />
      </Suspense>
    </AtlasFormDialog>
  );
}
