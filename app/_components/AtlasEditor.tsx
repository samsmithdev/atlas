import { Island_Moments } from "next/font/google";
import prisma from "../lib/db";
import AtlasMarkdownEditor from "./AtlasMarkdownEditor";
import { fetchFile, fetchFilesForProject } from "@/app/actions/files"
import { fetchProject } from "@/app/actions/projects"
import { fileURLToPath } from "url";

export default async function AtlasEditor() {
    const activeTestProject = await fetchProject("SD001");
    const activeTestFiles = await fetchFilesForProject(activeTestProject?.id ?? "");
    const activeTestFile = activeTestFiles.find(file => file.id === "SD0");
    // const userWithId99 = users.find(user => user.id === 99)
    //const activeTestFile = project?.files?.find(file => file.id = "SD0");

    console.log(activeTestFile);
    console.log(activeTestProject);

    return (
        <div className="w-full grid grid-cols-12 gap-4 mx-auto h-[95%] overflow-hidden"> {/* This is the main editing space, including the file nav and editor */}
            <div className="col-span-4 p-4 rounded mt-4 ml-0 border overflow-auto">
                <ul className="space-y-2 divide-y-3 divide-dashed divide-indigo-500">
                    {activeTestFiles.length ? (
                        activeTestFiles.map((file) => (
                            <li key={file.id}>
                                {file.name}
                            </li>
                        ))
                    ) : (
                        <li>No files found</li>
                    )}
                </ul>
            </div>

            <div className="col-span-8 mt-4 w-full gap-4 p-4 border rounded overflow-hidden">
                {activeTestFile ? (
                    <AtlasMarkdownEditor
                        fileId={activeTestFile.id}
                        initialContent={activeTestFile.content} />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <p>Please select a file to begin editing...</p>
                    </div>
                )}
            </div>
        </div>
    );
}