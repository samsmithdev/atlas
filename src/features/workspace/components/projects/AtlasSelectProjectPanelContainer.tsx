import AtlasSelectProjectPanel from "@/features/workspace/components/projects/AtlasSelectProjectPanel";
import { fetchSubjectsWithProjectSelectors } from "@/features/workspace/queries";

export default async function AtlasSelectProjectPanelContainer() {
  try {
    const projectsBySubject = await fetchSubjectsWithProjectSelectors();

    if (!projectsBySubject.success || !projectsBySubject.data) {
      throw Error();
    }

    const subjectsWithProjects = projectsBySubject.data;

    return (
      <AtlasSelectProjectPanel
        subjectSelectorsWithProjects={subjectsWithProjects}
      />
    );
  } catch (error) {
    console.error(
      "[SelectProjectContainer] Error Loading Select Project Panel:",
      error
    );

    return <p>Error loading subjects. Please try again later.</p>;
  }
}
