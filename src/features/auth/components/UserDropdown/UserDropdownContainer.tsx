"use server";

import { UserDropdown } from "@/features/auth/components/UserDropdown/UserDropdown";
import { fetchAuth } from "@/features/auth/queries";

export default async function UserDropdownContainer() {
  try {
    const userSession = await fetchAuth();

    if (!userSession.success || !userSession.data) {
      throw new Error("Authentication Check Failed");
    } else {
      const userData = userSession.data.session.user;

      return <UserDropdown user={{ ...userData }} />;
    }
  } catch (error) {
    console.error("[UserDropdownContainer] Error Authenticating User:", error);
    return <UserDropdown user={{}} />;
  }
}
