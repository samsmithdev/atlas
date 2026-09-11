import Header from "@/components/layout/Header";
import UserDropdownContainer from "@/features/auth/components/UserDropdown/UserDropdownContainer";
import UserDropdownSkeleton from "@/features/auth/components/UserDropdown/UserDropdownSkeleton";
import CreateSubjectProjectDropdown from "@/features/workspace/components/CreateSubjectProjectDropdown";
import { Suspense } from "react";

export default async function ProjectEditorHeader() {
  return (
    <Header
      leftNode={<CreateSubjectProjectDropdown />}
      rightNode={
        <Suspense fallback={<UserDropdownSkeleton />}>
          <UserDropdownContainer />
        </Suspense>
      }
    />
  );
}
