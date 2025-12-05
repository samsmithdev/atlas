import AtlasMarkdownEditor from "./AtlasMarkdownEditor";

export default function AtlasEditor() {

    return (
        <div className="w-full grid grid-cols-12 gap-4 mx-auto h-[95%]"> {/* This is the main editing space, including the file nav and editor */}
            <div className="col-span-4 p-4 rounded mt-4 ml-0 border">
                <ul className="space-y-2 divide-y-3 divide-dashed divide-indigo-500">
                    <li>Overview</li>
                    <li>Work Logs</li>
                    <li>Assets</li>
                </ul>
            </div>

            <div className="col-span-8 mt-4 w-full gap-4 p-4 border rounded">
                <AtlasMarkdownEditor />
            </div>
        </div>
    );
}