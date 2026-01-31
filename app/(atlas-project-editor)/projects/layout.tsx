import AtlasActionModal from "@/components/atlas/AtlasActionModal";
import { fetchSubjectSelectors } from "@/actions/subjects";
import { fetchProjectSelectors, fetchProjectsForMenu } from "@/actions/projects";
import { AtlasGroupedProjectsForNav, AtlasProjectNavigatorItem } from "@/types/AtlasNavigatorTypes";

export default async function AtlasProjectsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>
) {
    const subjectSelectors = await fetchSubjectSelectors();
    const projectSelectors = await fetchProjectSelectors();
    const projectLinkSubjectGroup = (await fetchProjectsForMenu()).reduce((accumulator, project) => {
        const subjectId = project.subject?.id ?? 'uncategorized';
        const subjectName = project.subject?.name ?? 'MISC';
        const shortCode = project.subject?.shortcode ?? 'MISC';
        
        if (!accumulator[subjectId]) {
            accumulator[subjectId] = {
                subjectName: subjectName,
                subjectShortcode: shortCode,
                projects: []
            };
        }

        const navigatorItem: AtlasProjectNavigatorItem = {
            id: project.id,
            name: project.name,
            link: `/projects/${project.id}/files`
        }

        accumulator[subjectId].projects.push(navigatorItem);

        return accumulator;
    }, {} as AtlasGroupedProjectsForNav)

    return (
        <div className="w-full h-full bg-black" id='atlas-projects-layout'>
            {children}
            <AtlasActionModal projects={projectSelectors} subjects={subjectSelectors} projectLinkSubjectGroup={projectLinkSubjectGroup}/>
        </div>
    )
}