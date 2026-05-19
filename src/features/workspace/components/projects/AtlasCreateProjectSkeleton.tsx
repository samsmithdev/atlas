import { Skeleton } from "@/components/ui/skeleton";

export function AtlasCreateProjectSkeleton() {
  return (
    <div className="space-y-4 w-full">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="flex justify-end">
        <Skeleton className="h-10 W-24" />
      </div>
    </div>
  );
}
