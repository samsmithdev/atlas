import Header from "@/components/layout/Header";
import UserDropdownContainer from "@/features/auth/components/UserDropdown/UserDropdownContainer";
import UserDropdownSkeleton from "@/features/auth/components/UserDropdown/UserDropdownSkeleton";
import { Suspense } from "react";

export default async function ProjectEditorHeader() {
  return (
    <Header
      rightNode={
        <Suspense fallback={<UserDropdownSkeleton />}>
          <UserDropdownContainer />
        </Suspense>
      }
    />
  );
}
