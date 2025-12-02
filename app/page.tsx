import Image from "next/image";
import AtlasToolbar from "./_components/Atlas-Toolbar";

export default function Home() {

  return (
    <div className="container w-screen mx-auto">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">ATLAS Interface</h1>
      </header>
      <main className="max-w-full">

        <AtlasToolbar />

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
