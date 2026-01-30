import { fetchProjectSelector } from "@/actions/projects";
import AtlasProjectToolbar from "@/components/atlas/AtlasProjectToolbar";
import AtlasProjectSelectorButton from "@/components/atlas/buttons/AtlasProjectSelectorButton";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>; 
}

export default async function AtlasProjectIdLayout({
    children, params
}: LayoutProps) {
    const { projectId } = await params;
    const activeProject = await fetchProjectSelector(projectId);

    return (
        <div className="w-full h-full flex flex-col">
            <div className=""><AtlasProjectToolbar activeProject={activeProject ?? undefined}/></div>
            <div className="flex-1">{children}</div>
        </div>
    )

}