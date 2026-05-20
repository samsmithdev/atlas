// src/app/(sandbox)/design/page.tsx
import AtlasCreateProjectForm from "@/features/workspace/components/projects/AtlasCreateProjectForm";
import { AtlasCreateProjectSkeleton } from "@/features/workspace/components/projects/AtlasCreateProjectSkeleton";

export default function DesignSandbox() {
  return (
    <div className="p-10 max-w-md mx-auto space-y-12">
      <section>
        <h2 className="text-xl font-bold mb-4 border-b pb-2">
          Create Project Skeleton
        </h2>
        <div className="border rounded-lg p-4 bg-background shadow-sm">
          {/* Render it directly here with no database requirements! */}
          <AtlasCreateProjectSkeleton />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 border-b pb-2">
          Create Project Form
        </h2>
        <div className="flex gap-4">
          <AtlasCreateProjectForm subjects={[]} />
        </div>
      </section>
    </div>
  );
}
