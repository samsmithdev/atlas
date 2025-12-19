import prisma from '@/app/lib/db';

export default async function AtlasToolbar() {
    const project = await prisma.project.findFirst({
        where: {
            name: "Atlas",
        }
    });

    return (
        <div className="w-full mt-2 mb-2 gap-4 border grid grid-flow-col"> {/* This is the "toolbar/project selector" bar */}
            <div className="m-2 grid grid-flow-col text-xl font-bold border-b border-indigo-500 w-fit shrink"> {/* This is the project selector */}
                <div className="whitespace-nowrap shrink mr-2">
                    <h2 className="shrink">{project?.name ?? "Null value"}</h2>
                </div>
                <div className="w-fit ml-2 mr-2">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white shrink" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                    </svg>
                </div>
            </div>
            <div className="m-2 text-xl font-bold w-fit shrink"> {/* This is the toolbar to the right of the project selector */}
                <p>Hello World!</p>
            </div>
        </div>
    );
}