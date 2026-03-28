import { fetchProjectSelector } from "@/actions/projects";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}

export default async function AtlasProjectIdLayout({
  children,
  params,
}: LayoutProps) {
  const { projectId } = await params;
  const activeProject = await fetchProjectSelector(projectId);

  return (
    <div className="w-full h-full flex flex-col" id="atlas-projectid-layout">
      <div
        className="flex-1 w-full overflow-hidden"
        id="atlas-projectid-layout_body-container"
      >
        {children}
      </div>
    </div>
  );
}
