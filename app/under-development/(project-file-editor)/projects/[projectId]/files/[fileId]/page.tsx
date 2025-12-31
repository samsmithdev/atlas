import { NULL_PROJECTID } from "@/app/_constants/uncategorized-items";
import { fetchFile } from "@/app/actions/files";
import AtlasEditor from "@/app/_components/AtlasEditor";

// This page will have the editor loaded with fileId
type PageProps = {
    params: { projectId?: string, fileId?: string }
}
export default async function FileEditorPage({ params }: PageProps) {
    const file = params.fileId ? (await fetchFile(params.fileId)) ?? undefined: (undefined) ;

    return (
        <div>
            <AtlasEditor file={file} />
        </div>
    )
}