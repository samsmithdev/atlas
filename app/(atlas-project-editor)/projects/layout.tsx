// This will just be a Project navigator in the top left corner of this div
import { ReactNode } from 'react'
import { fetchAllProjects, fetchProject } from '@/actions/projects'
import AtlasToolbar from '@/app/_components/AtlasToolbar';

type LayoutProps = {
    children: ReactNode,
    params: {}
}

export default async function ProjectLayout({ children, params }: LayoutProps) {
    return (
        <div className="w-full h-full" id="projects-layout-container">
                {children}
        </div>
    )
}