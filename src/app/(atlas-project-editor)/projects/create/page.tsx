// Fallback subject/project create page
"use server";

import { fetchSubjectSelectors } from "@/features/workspace/queries";

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

export default async function AtlasCreateProjectPage() {
  const subjectSelectors = await fetchSubjectSelectors();

  if (!subjectSelectors.success || !subjectSelectors.data) {
    return <div>Error fetching subject selectors</div>;
  }

  const subjects = subjectSelectors.data;

  return (
    <div>
      <h1>Create a Project</h1>
      <Suspense fallback={<AtlasCreateProjectSkeleton />}>
        <FormLoader />
      </Suspense>
    </div>
  );
}
