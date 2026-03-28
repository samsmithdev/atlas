import AtlasProjectSelectorPanel from "@/features/projects/components/AtlasProjectSelectorPanel";
import { fetchProjectSelectorsBySubject } from "@/features/projects/queries";

export default async function ProjectsHomepage() {
  const projectsBySubjectResults = await fetchProjectSelectorsBySubject();

  const projectsBySubjects =
    projectsBySubjectResults.success && projectsBySubjectResults.data
      ? projectsBySubjectResults.data
      : [];

  return (
    <div className="w-full h-full p-2 overflow-hidden">
      <AtlasProjectSelectorPanel projectsInSubjects={projectsBySubjects} />
    </div>
  );
}
