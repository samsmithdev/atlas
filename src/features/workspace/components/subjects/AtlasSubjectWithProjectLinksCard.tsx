import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubjectWithProjectSelectors } from "@/features/workspace/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AtlasSubjectWithProjectLinksCardProps {
  subject: SubjectWithProjectSelectors;
  className?: string;
}

export default function AtlasSubjectWithProjectLinksCard({
  subject,
  className,
}: AtlasSubjectWithProjectLinksCardProps) {
  return (
    <Card className={cn(className, "w-full max-w-sm")}>
      <CardHeader>
        <CardTitle>{subject.readableName}</CardTitle>
        {subject.description !== "" && (
          <CardDescription>{subject.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <ol>
          {subject.projects.length > 0 ? (
            subject.projects.map((project) => (
              <li key={project.id}>
                <Link href={`/projects/${project.id}/files`}>
                  {project.readableName}
                </Link>
              </li>
            ))
          ) : (
            <li key="123">No Projects Found</li>
          )}
        </ol>
      </CardContent>
    </Card>
  );
}
