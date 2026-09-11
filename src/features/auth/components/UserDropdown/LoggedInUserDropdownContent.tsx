import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

interface LoggedInUserDropdownContentProps {
  user: {
    name: string;
    email: string;
    imageUrl?: string | null;
  };
}
export default function LoggedInUserDropdownContent({
  user,
}: LoggedInUserDropdownContentProps) {
  return (
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{user.name}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user.email}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="text-red-600 cursor-pointer"
        onClick={() => signOut({ redirectTo: "/" })}
      >
        Log Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
