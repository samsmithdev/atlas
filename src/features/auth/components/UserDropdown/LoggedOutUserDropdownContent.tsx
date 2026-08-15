import { signIn } from "next-auth/react";

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function LoggedOutUserDropdownContent() {
  return (
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuItem
        className="font-bold"
        onClick={() => signIn(undefined, { callbackUrl: "/projects" })}
      >
        Log In
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
