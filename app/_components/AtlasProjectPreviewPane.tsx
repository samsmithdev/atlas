// Preview Pane 
import { fetchProject } from "../actions/projects";
import { Project } from "../generated/prisma";

export default async function AtlasProjectPreviewPane({ previewProjectId }: { previewProjectId?: string }) {
    const blankProject: Project = {
        name: "No Project Selected",
        id: "-",
        created_date: new Date(),
        author: "-",
        description: "-",
        subjectId: null
    }

    const previewProject = previewProjectId ? (await fetchProject(previewProjectId)) ?? blankProject : (blankProject);

    return (
        <div className="flex flex-col mx-auto items-center" id="atlas-project-preview-pane-container">
            {/* Just one column of fields? */}
            <ul className="mx-auto" id="atlas-project-preview-pane-list">
                <li key="name">
                    <p className="font-bold">Project Name: {previewProject.name}</p>
                </li>
                <li key="id">
                    <p className="font-bold">Project ID: {previewProject.id}</p>
                </li>
            </ul>
        </div>
    )
}