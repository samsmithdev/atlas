"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoggedInUserDropdownContent from "@/features/auth/components/UserDropdown/LoggedInUserDropdownContent";
import LoggedOutUserDropdownContent from "@/features/auth/components/UserDropdown/LoggedOutUserDropdownContent";
import { User } from "lucide-react";

interface UserDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    imageUrl?: string | null;
  };
}

export function UserDropdown({ user }: UserDropdownProps) {
  const userLoggedIn = user.email != null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-8 w-8 rounded-full focus:outline-none focus:ring-2 focus:ring-ring">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.imageUrl || ""}
              alt={user.name || "User avatar"}
            />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      {userLoggedIn ? (
        <LoggedInUserDropdownContent
          user={{
            name: user.name ?? "",
            email: user.email ?? "",
            imageUrl: user.imageUrl ?? "",
          }}
        />
      ) : (
        <LoggedOutUserDropdownContent />
      )}
    </DropdownMenu>
  );
}
