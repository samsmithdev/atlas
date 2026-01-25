import Link from "next/link";

export default function Home() {

  return (
    <div className="bg-slate-900 w-full h-full items-center flex flex-col gap-8">
      <h1 className="text-5xl text-indigo-200 border-b-4 border-indigo-500 p-8">Welcome to the ATLAS Development Center!</h1>
      <p className="text-xs text-indigo-200">Unauthorized use is not authorized.</p>
      <Link
        className="border rounded-2xl border-indigo-600 text-white mx-auto p-4 text-2xl"
        href="/projects">
        Open /projects
      </Link>
    </div>
  );
}
