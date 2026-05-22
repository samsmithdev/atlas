"use server";

import AtlasSelectProjectPanelContainer from "@/features/workspace/components/projects/AtlasSelectProjectPanelContainer";
import AtlasSelectProjectPanelSkeleton from "@/features/workspace/components/projects/AtlasSelectProjectPanelSkeleton";
import { Suspense } from "react";

export default async function AtlasSelectProjectPage() {
  return (
    <div>
      <h1>Create a Project</h1>
      <div>
        <Suspense fallback={<AtlasSelectProjectPanelSkeleton />}>
          <AtlasSelectProjectPanelContainer />
        </Suspense>
      </div>
    </div>
  );
}
