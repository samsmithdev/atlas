import { MarkdownEditorPanel } from "@/features/markdownEditor";
import { fetchFileContent } from "@/features/workspace/queries";

interface AtlasFileIdPageProps {
  params: Promise<{ projectId: string; fileId: string }>;
}

export default async function AtlasFileIdPage({
  params,
}: AtlasFileIdPageProps) {
  const { projectId, fileId } = await params;
  const fileResponse = await fetchFileContent(fileId);

  if (!fileResponse.data) {
    return null;
  }

  const fileContents = JSON.stringify(fileResponse.data);

  return (
    <div className="h-full w-full" id="atlas-fileid-page">
      <MarkdownEditorPanel initialContent={fileContents} />
    </div>
  );
}
