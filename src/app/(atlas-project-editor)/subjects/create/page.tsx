"use server";

import AtlasCreateSubjectForm from "@/features/workspace/components/AtlasCreateSubjectForm";

export default async function AtlasCreateSubjectPage() {
  return (
    <div>
      <h1>Create a Subject</h1>
      <AtlasCreateSubjectForm />
    </div>
  );
}
