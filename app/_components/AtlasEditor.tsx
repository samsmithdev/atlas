import prisma from "../lib/db";
import AtlasMarkdownEditor from "./AtlasMarkdownEditor";

export default async function AtlasEditor() {
    const project = await prisma.project.findFirst({
        where: {
            name: "Atlas",
        },
        include: {
            files: true,
        }
    });

    return (
        <div className="w-full grid grid-cols-12 gap-4 mx-auto h-[95%] overflow-hidden"> {/* This is the main editing space, including the file nav and editor */}
            <div className="col-span-4 p-4 rounded mt-4 ml-0 border overflow-auto">
                <ul className="space-y-2 divide-y-3 divide-dashed divide-indigo-500">
                    {project?.files.length ? (
                        project.files.map((file) => (
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
                <AtlasMarkdownEditor />
            </div>
        </div>
    );
}