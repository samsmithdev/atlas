'use client';

import { deleteProject } from "@/actions/projects";
import AtlasListItemCard from "@/components/atlas/cards/AtlasListItemCard";
import { Button } from '@/components/ui/button';
import { Card,
        CardTitle,
        CardDescription,
        CardHeader,
        CardContent,
        CardAction,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AtlasItemType, AtlasListItem } from "@/types/AtlasListTypes";
import { startTransition, useOptimistic } from "react";

interface AtlasSubjectWithProjectLinksCardProps {
    subjectName: string;
    subjectDescription: string;
    subjectId: string;
    projects: AtlasListItem[];
    onDelete: (id: string) => void;
}

export default function AtlasSubjectWithProjectLinksCard({ subjectName, subjectDescription, subjectId, projects, onDelete }: AtlasSubjectWithProjectLinksCardProps) {
    const [optimisticProjects, removeOptimisticProject] = useOptimistic(
        projects,
        (currentProjects, projectIdToRemove: string) => {
            return currentProjects.filter(project => project.itemId !== projectIdToRemove);
        }
    );

    const handleDeleteProjectRequest = async (projectId: string) => {
        startTransition(() => {
            removeOptimisticProject(projectId);
        });

        const result = await deleteProject(projectId);

        if (!result.success) {
            console.error("Failed to delete");
        }
    }

    return (
        <Card>
            <CardTitle>{subjectName}</CardTitle>
            <CardDescription>{subjectDescription}</CardDescription>
            <CardAction>
                <Button size='xs' variant='destructive' onClick={() => onDelete(subjectId)}>X</Button>
            </CardAction>
            <CardContent className={cn(
                // Content Border
                'border-2 rounded-none border-primary',
                // Content Background
                'bg-background',
                // Content Positioning
                '',
                // Content Styling
                'flex flex-col overflow-y-scroll'
            )}>
                {(projects && projects.length > 0) ? (
                    <ul>
                        {projects.map((project) => (
                            <AtlasListItemCard key={project.itemId} displayText={project.displayText} itemId={project.itemId} onDelete={handleDeleteProjectRequest} href={project.link} />
                        ))}
                    </ul>
                ) : 
                (<p>No Projects</p>) }
            </CardContent>
        </Card>
    );
}