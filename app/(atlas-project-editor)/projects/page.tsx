import AtlasSelectProjectPane from "@/components/atlas/panes/AtlasSelectProjectPane";
import AtlasActionModalTestPage from "./_components/AtlasActionModalTestPage";
import { fetchProjectsForMenu } from "@/actions/projects";
import { AtlasProjectNavigatorItem, AtlasGroupedProjectsForNav } from "@/types/AtlasNavigatorTypes";
import { AtlasListGroup, AtlasItemType, AtlasProjectNavigatorItems } from "@/types/AtlasListTypes";

export default async function ProjectsHomepage() {
    const handleDeleteRequest = async (itemId: string, itemType: AtlasItemType) => {
        
    }

    const projectLinkSubjectGroup = (await fetchProjectsForMenu()).reduce((accumulator, project) => {
        const subjectId = project.subject?.id ?? 'uncategorized';
        const subjectName = project.subject?.name ?? 'MISC';

        const shortCode = project.subject?.shortcode ?? 'MISC';
        const subjectDescription = project.subject?.description ?? '';
        const header = `${shortCode} ${subjectName}`;

        if (!accumulator[subjectId]) {
            accumulator[subjectId] = {
                header: header,
                description: subjectDescription,
                id: subjectId,
            };
        }

        const navigatorItem: AtlasProjectNavigatorItem = {
            id: project.id,
            name: project.name,
            link: `/projects/${project.id}/files`
        }

        accumulator[subjectId].projects.push(navigatorItem);

        return accumulator;
    }, {} as AtlasProjectNavigatorItems)

    return (
        <AtlasSelectProjectPane projectsGroupedBySubject={projectLinkSubjectGroup} />
    );
}
