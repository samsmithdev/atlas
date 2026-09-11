import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubjectWithProjectSelectors } from "@/features/workspace/types";
import { AppRoutes } from "@/lib/routes";
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
        {subject.projects.length > 0 ? (
          <ol>
            {subject.projects.map((project) => (
              <li key={project.id}>
                <Link href={AppRoutes.projectFiles(project.id)}>
                  {project.readableName}
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p>No Projects Found</p>
        )}
      </CardContent>
    </Card>
  );
}
