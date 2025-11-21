import Image from "next/image";

export default function Home() {
  
  return (
    <div>
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">ATLAS Interface</h1>
      </header>

      <div className="container mx-auto grid grid-cols-12 gap-4">
        <div className="col-span-4 p-4 rounded mt-4 ml-0">
          <ul className="space-y-2">
            <li>Overview</li>
            <li>Work Logs</li>
            <li>Assets</li>
          </ul>
        </div>

        <div className="col-span-8">
          <p>This is a whole lot of text.</p>
        </div>
      </div>
    </div>
  );
}
