// Preview Pane 
import Link from "next/link";
import { fetchProject } from "../actions/projects";
import { Project } from "../generated/prisma";

export default async function AtlasProjectPreviewPane({ previewProjectId, openLink }: { previewProjectId?: string, openLink?: string }) {
    const blankProject: Project = {
        name: "No Project Selected",
        id: "-",
        created_date: new Date(),
        author: "-",
        description: "-",
        subjectId: null,
        readableId: "-",
        fileSequence: -1
    }

    const previewProject = previewProjectId ? (await fetchProject(previewProjectId)) ?? blankProject : (blankProject);

    return (
        <div className="flex items-center justify-center" id="atlas-project-preview-pane-container">
            {/* Just one column of fields? */}
            <ul className="mx-auto flex flex-col gap-4" id="atlas-project-preview-pane-list">
                <li key="name">
                    <p className="font-bold">Project Name: {previewProject.name}</p>
                </li>
                <li key="id">
                    <p className="font-bold">Project ID: {previewProject.id}</p>
                </li>
                <li key="description">
                    <p className="font-bold">Project Description:</p>
                    <p>{previewProject.description}</p>
                </li>
                <li key="open">
                    {openLink ? (<Link className="border border-indigo-500 bg-gray-700 hover:bg-gray-200 text-gray-100 p-2 rounded-2xl hover:text-gray-800" href={openLink}>Open Project</Link>) : (<div>Open...</div>)}
                </li>
            </ul>
        </div>
    )
}