import AtlasActionModal from "@/components/atlas/AtlasActionModalBeta";
import { fetchSubjectSelectors } from "@/actions/subjects";
import { fetchProjectSelectors } from "@/actions/projects";

export default async function AtlasProjectsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>
) {
    const subjectSelectors = await fetchSubjectSelectors();
    const projectSelectors = await fetchProjectSelectors();

    return (
        <div className="w-full h-full">
            {children}
            <AtlasActionModal projects={projectSelectors} subjects={subjectSelectors} projectLinkSubjectGroup={}/>
        </div>
    )
}