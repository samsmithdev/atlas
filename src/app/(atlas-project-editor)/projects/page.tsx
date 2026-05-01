import Link from "next/link";

export default async function ProjectsHomepage() {
  return (
    <div className="w-full h-full p-2 overflow-hidden">
      <Link href="/subjects/create">Create Subject Modal?</Link>
    </div>
  );
}