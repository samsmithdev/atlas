import AtlasSelectProjectContainer from "@/features/workspace/components/projects/AtlasSelectProjectPanelContainer";
import AtlasSelectProjectPanelSkeleton from "@/features/workspace/components/projects/AtlasSelectProjectPanelSkeleton";
import { Suspense } from "react";

export default async function ProjectsHomepage() {
  return (
    <div className="w-full h-full p-2 overflow-hidden">
      <Suspense fallback={<AtlasSelectProjectPanelSkeleton />}>
        <AtlasSelectProjectContainer />
      </Suspense>
    </div>
  );
}
