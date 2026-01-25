import Link from "next/link";

export default function Home() {

  return (
    <div className="bg-slate-900 w-full h-full items-center flex flex-col">
      <h1>Welcome to the ATLAS Development center!</h1>
      <Link
        className="border rounded-2xl border-indigo-600 text-white mx-auto p-4 text-2xl"
        href="/projects">
        Open /projects
      </Link>
    </div>
  );
}
