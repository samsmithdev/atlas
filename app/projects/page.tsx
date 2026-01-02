// /projects, unselected ID
// This will be the Project navigator screen, with the project selector displayed but disabled with "Please Select Project to begin."
import { notFound } from 'next/navigation';
import { fetchProjectsForMenu } from '@/app/actions/projects';
import AtlasFullpageProjectNavigator from '@/app/_components/AtlasFullpageProjectNavigator';

export default async function ProjectsBrowser({
    searchParams,
}: {
    searchParams: { preview?: string }
}) {
    const search = await searchParams;

    const allProjects = (await fetchProjectsForMenu()).map((project) => {
        return { id: project.id, name: project.name, subject: project.subject ?? undefined, subjectId: project.subjectId ?? undefined, link: `/projects?preview=${project.id}` }
    });

    return (
        <div>
            <AtlasFullpageProjectNavigator allProjects={allProjects} previewProjectId={search.preview}/>
        </div>
    )
}