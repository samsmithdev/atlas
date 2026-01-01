import { NULL_PROJECTID } from "@/app/_constants/uncategorized-items";
import { fetchFile } from "@/app/actions/files";
import AtlasEditor from "@/app/_components/AtlasEditor";

// This page will have the editor loaded with fileId
type PageProps = {
    params: { projectId?: string, fileId?: string }
}
export default async function FileEditorPage({ params }: PageProps) {
    const awaitedParams = await params;
    const file = awaitedParams.fileId ? (await fetchFile(awaitedParams.fileId)) ?? undefined: (undefined) ;

    return (
        <div className="w-full h-full overflow-hidden flex" id="fileId-page-editor-container">
            <AtlasEditor file={file} />
        </div>
    )
}