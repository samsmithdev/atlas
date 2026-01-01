// This will be a blank screen for passing things maybe?
import { ReactNode } from 'react'
import { fetchAllProjects, fetchProject } from '@/app/actions/projects'
import AtlasToolbar from '@/app/_components/AtlasToolbar';

type LayoutProps = {
    children: ReactNode,
    params: { projectId?: string }
}

export default function ProjectIDBlankPage({ children, params }: LayoutProps) {
    return (
        <div>
            {children}
        </div>
    )
}