import AtlasCreateProjectForm from "@/features/workspace/components/projects/AtlasCreateProjectForm";
import { fetchSubjectSelectors } from "@/features/workspace/queries";

export default async function AtlasCreateProjectFormContainer() {
  try {
    const subjectSelectors = await fetchSubjectSelectors();

    if (!subjectSelectors.success || !subjectSelectors.data) {
      throw Error();
    }

    const subjects = subjectSelectors.data;

    return <AtlasCreateProjectForm subjects={subjects} />;
  } catch (error) {
    console.error(
      "[CreateProjectFormContainer] Error Loading Subjects:",
      error
    );
    return <p>Error loading subjects</p>;
  }
}
