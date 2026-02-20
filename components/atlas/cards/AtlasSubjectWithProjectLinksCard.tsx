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

interface AtlasSubjectWithProjectLinksCardProps {
    subjectName: string;
    subjectDescription: string;
    subjectId: string;
    projects: AtlasListItem[];
    onDelete: (id: string, type: AtlasItemType) => void;
}

export default function AtlasSubjectWithProjectLinksCard({ subjectName, subjectDescription, subjectId, projects, onDelete }: AtlasSubjectWithProjectLinksCardProps) {
    return (
        <Card>
            <CardTitle>{subjectName}</CardTitle>
            <CardDescription>{subjectDescription}</CardDescription>
            <CardAction>
                <Button size='xs' variant='destructive' onClick={() => onDelete(subjectId, AtlasItemType.Subject)}>X</Button>
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
                            <AtlasListItemCard displayText={project.displayText} itemId={project.itemId} onDelete={() => project.onDelete(project.itemId, AtlasItemType.Project)} href={project.link} />
                        ))}
                    </ul>
                ) : 
                (<p>No Projects</p>) }
            </CardContent>
        </Card>
    );
}