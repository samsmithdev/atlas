// Defined at /projects/[projectId]/files/layout.tsx

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ projectId: string; fileId?: string }>;
}

export default async function AtlasFilesLayout({
  children,
  params,
}: LayoutProps) {
  const { projectId } = await params;

  return (
    <div
      className="w-full h-full flex flex-row gap-8"
      id="atlas-files-layout_container"
    >
      <div
        className="w-1/4 overflow-y-auto mb-8 mt-8 scroll-h"
        id="atlas-files-layout_select-file-container"
      >
        {/* Future select file for project panel*/}
      </div>
      <div className="flex-1 mb-8 mr-6" id="atlas-files-layout_content">
        {children}
      </div>
    </div>
  );
}
