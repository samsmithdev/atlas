import { Skeleton } from "@/components/ui/skeleton";

export function AtlasCreateProjectSkeleton() {
  return (
    <div className="space-y-4 w-56">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="grid gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="grid gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="grid gap-2 justify-end">
        <Skeleton className="h-10 w-36" />
      </div>
    </div>
  );
}
