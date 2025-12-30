// Preview Pane 
import { fetchProject } from "../actions/projects";

export default async function AtlasProjectPreviewPane({ previewProjectId }: { previewProjectId?: string }) {
    const previewProject = previewProjectId ? (await fetchProject(previewProjectId)) : (undefined);

    return (
        <div>
            {previewProject ? 
            (<p>The project is {previewProject.name}</p>) : 
            (<p>There is no project selected.</p>)}
        </div>
    )
}