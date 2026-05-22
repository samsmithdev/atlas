import AtlasSelectProjectContainer from "@/features/workspace/components/projects/AtlasSelectProjectPanelContainer";
import AtlasSelectProjectPanelSkeleton from "@/features/workspace/components/projects/AtlasSelectProjectPanelSkeleton";
import Link from "next/link";
import { Suspense } from "react";

export default async function ProjectsHomepage() {
  return (
    <div className="w-full h-full p-2 overflow-hidden">
      <Link href="/subjects/create">Create Subject Modal?</Link>
      <Link href="/projects/create">Create Project Modal</Link>
      <Link href="/projects/select">Select Project Modal</Link>
      <Suspense fallback={<AtlasSelectProjectPanelSkeleton />}>
        <AtlasSelectProjectContainer />
      </Suspense>
    </div>
  );
}
