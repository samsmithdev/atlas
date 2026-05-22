import AtlasSelectProjectPanel from "@/features/workspace/components/projects/AtlasSelectProjectPanel";
import { fetchSubjectsWithProjectSelectors } from "@/features/workspace/queries";
import Link from "next/link";
import { Suspense } from "react";

async function ProjectPanelLoader() {
  try {
    const projectsBySubject = await fetchSubjectsWithProjectSelectors();

    if (!projectsBySubject.success || !projectsBySubject.data) {
      throw Error();
    }

    const subjectsWithProjects = projectsBySubject.data;

    console.log("Subjects", subjectsWithProjects);

    return (
      <AtlasSelectProjectPanel
        subjectSelectorsWithProjects={subjectsWithProjects}
      />
    );
  } catch (error) {
    console.error("[ProjectPanelLoader] Database Error", error);
    return <p>Database Error</p>;
  }
}

export default async function ProjectsHomepage() {
  return (
    <div className="w-full h-full p-2 overflow-hidden">
      <Link href="/subjects/create">Create Subject Modal?</Link>
      <Link href="/projects/create">Create Project Modal</Link>
      <Suspense fallback={<p>Loading projects</p>}>
        <ProjectPanelLoader />
      </Suspense>
    </div>
  );
}
