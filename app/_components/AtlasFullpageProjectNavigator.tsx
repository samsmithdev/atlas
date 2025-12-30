import { fetchProjectsForMenu } from "../actions/projects";
import { Subject } from "../generated/prisma";
import AtlasProjectPreviewPane from "./AtlasProjectPreviewPane";

export interface AtlasProjectNavigatorMenuItem {
    id: string,
    name: string,
    subject?: Subject,
    subjectId?: string,
    link: string,
}


/*
<ul>
    <li>SD Software Dev
        <ul>
            <li><a href=project.link>{project.name}</a></li>
        </ul>
    </li>
</ul>
*/
export default async function AtlasFullpageProjectNavigator({ allProjects, previewProjectId }: {allProjects: AtlasProjectNavigatorMenuItem[], previewProjectId?: string}) {
    const menuItems = "";

    return (
        <div> {/* the full navigator */}
            <div> { /* this is the Projects navigator, it should take up 2/3 of the width and have 2 columns */}

            </div>

            <div> { /* this is the project preview pane, this div should style the sizing */ }
                <AtlasProjectPreviewPane previewProjectId={previewProjectId}/>
            </div>
        </div>
    );
}