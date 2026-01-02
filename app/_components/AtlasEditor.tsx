import { Island_Moments } from "next/font/google";
import prisma from "../lib/db";
import AtlasMarkdownEditor from "./AtlasMarkdownEditor";
import { fetchFile, fetchFilesForProject } from "@/app/actions/files"
import { fetchProject } from "@/app/actions/projects"
import { fileURLToPath } from "url";
import { File } from "../generated/prisma";

export type AtlasEditorProps = {
    file?: File
}

export default async function AtlasEditor( { file }: AtlasEditorProps ) {

    return (
        <div className="mt-4 mb-4 mr-4 ml-2 flex-1" id="atlas-editor-container"> {/* This is the main editing space */}
            <div className="w-full h-full border rounded overflow-auto" id="atlas-editor-markdown-container">
                {file ? (
                    <AtlasMarkdownEditor
                        fileId={file.id}
                        initialContent={file.content} />
                ) : (
                    <div className="h-full text-gray-400">
                        <p>Please select a file to begin editing...</p>
                    </div>
                )}
            </div>
        </div>
    );
}