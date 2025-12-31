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
        <div className="w-full grid grid-cols-12 gap-4 mx-auto h-[95%] overflow-hidden"> {/* This is the main editing space, including the file nav and editor */}
            <div className="col-span-8 mt-4 w-full gap-4 p-4 border rounded overflow-hidden">
                {file ? (
                    <AtlasMarkdownEditor
                        fileId={file.id}
                        initialContent={file.content} />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <p>Please select a file to begin editing...</p>
                    </div>
                )}
            </div>
        </div>
    );
}