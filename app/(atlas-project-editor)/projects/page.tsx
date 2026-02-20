import AtlasSelectProjectPane from "@/components/atlas/panes/AtlasSelectProjectPane";
import AtlasActionModalTestPage from "./_components/AtlasActionModalTestPage";
import { fetchProjectsForMenu } from "@/actions/projects";
import { AtlasProjectNavigatorItem, AtlasGroupedProjectsForNav } from "@/types/AtlasNavigatorTypes";
import { AtlasListGroup, AtlasItemType, AtlasProjectNavigatorItems, AtlasListItem } from "@/types/AtlasListTypes";

// Import Delete Server Actions
import { deleteFile } from "@/actions/files";
import { deleteFolder } from "@/actions/folders";
import { deleteProject } from "@/actions/projects";
import { deleteSubject } from "@/actions/subjects";
import AtlasProjectSelectorSubjectCardPane from "@/components/atlas/panes/AtlasProjectSelectorSubjectCardPane";

export default async function ProjectsHomepage() {
    const handleDeleteRequest = async (itemId: string, itemType: AtlasItemType) => {
        switch (itemType) {
            case AtlasItemType.File:
                const deletedFile = await deleteFile(itemId);
                return deletedFile;
            case AtlasItemType.Folder:
                const deletedFolder = await deleteFolder(itemId);
                return deletedFolder;
            case AtlasItemType.Project:
                const deletedProject = await deleteProject(itemId);
                return deletedProject;
            case AtlasItemType.Subject:
                const deletedSubject = await deleteSubject(itemId);
                return deletedSubject;
        }
    }

    const projectNavigatorItems = (await fetchProjectsForMenu()).reduce((accumulator, project) => {
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
                listItems: []
            };
        }

        const projectItem: AtlasListItem = {
            displayText: project.name,
            itemId: project.id,
            link: `/projects/${project.id}/files`,
        }

        accumulator[subjectId].listItems.push(projectItem);

        return accumulator;
    }, {} as AtlasProjectNavigatorItems)

    return (
        <AtlasProjectSelectorSubjectCardPane projectNavigatorItems={Object.values(projectNavigatorItems)}/>
    );
}
