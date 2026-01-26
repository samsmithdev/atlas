import AtlasActionModal from "@/components/atlas/AtlasActionModalBeta";
import { fetchSubjectSelectors } from "@/actions/subjects";

export default async function AtlasProjectsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>
) {
    const subjectSelectors = await fetchSubjectSelectors();

    return (
        <div className="w-full h-full">
            {children}
            <AtlasActionModal subjects={subjectSelectors}/>
        </div>
    )
}