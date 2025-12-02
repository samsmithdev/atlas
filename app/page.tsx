import Image from "next/image";

export default function Home() {

  return (
    <div className="container w-screen mx-auto">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">ATLAS Interface</h1>
      </header>
      <main className="max-w-full">

        <div className="m-2 border border-indigo-500 p-4 grid grid-flow-col"> {/* This is the "toolbar/project selector" bar */}
          <div className="m-2 grid grid-flow-col text-xl font-bold border-b border-indigo-500 w-fit shrink"> {/* This is the project selector */}
            <div className="whitespace-nowrap shrink mr-2">
              <h2 className="shrink">SD000001 - A.T.L.A.S.</h2>
            </div>
            <div className="w-fit ml-2 mr-2">
              <svg className="w-6 h-6 text-gray-800 dark:text-white shrink" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div> {/* This is the toolbar to the right of the project selector */}
            <p>Hello World!</p>
          </div>
        </div>

        <div className="w-full m-2 grid grid-cols-12 gap-4 border"> {/* This is the main editing space, including the file nav and editor */}
          <div className="col-span-4 p-4 rounded mt-4 ml-0 border">
            <ul className="space-y-2 divide-y-3 divide-dashed divide-indigo-500">
              <li>Overview</li>
              <li>Work Logs</li>
              <li>Assets</li>
            </ul>
          </div>

          <div className="container col-span-8 mt-4 gap-4 p-4 border rounded">
            <p>This is a whole lot of text.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
