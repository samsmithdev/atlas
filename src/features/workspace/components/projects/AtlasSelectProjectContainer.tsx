import AtlasSelectProjectPanel from "@/features/workspace/components/projects/AtlasSelectProjectPanel";
import { fetchSubjectsWithProjectSelectors } from "@/features/workspace/queries";

export default async function AtlasSelectProjectContainer() {
    try {
        const projectsBySubject = await fetchSubjectsWithProjectSelectors();

        if (!projectsBySubject.success || !projectsBySubject.data) {
            throw Error();
        }

        const subjectsWithProjects = projectsBySubject.data;

        return (<AtlasSelectProjectPanel subjectSelectorsWithProjects={subjectsWithProjects} />)
    }
}