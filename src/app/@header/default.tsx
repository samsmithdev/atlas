import Header from "@/components/layout/Header";
import UserDropdownContainer from "@/features/auth/components/UserDropdownContainer";
import UserDropdownSkeleton from "@/features/auth/components/UserDropdownSkeleton";
import { Suspense } from "react";

export default async function HeaderPage() {
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
