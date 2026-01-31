import { fetchFile } from "@/actions/files";
import AtlasEditMarkdownFilePane from "@/components/atlas/panes/AtlasEditMarkdownFilePane";

interface AtlasFileIdPageProps {
    params: Promise<{ projectId: string, fileId: string }>;
}

export default async function AtlasFileIdPage({ params }: AtlasFileIdPageProps) {
    const { projectId, fileId } = await params;
    const file = await fetchFile(fileId);

    return (
        <div className="h-full w-full" id='atlas-fileid-page'>
            <AtlasEditMarkdownFilePane fileId={fileId} initialContent={file?.content} />
        </div>
    )
}