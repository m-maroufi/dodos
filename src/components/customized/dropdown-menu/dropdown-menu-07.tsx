import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bolt,
  ExternalLink,
  Filter,
  LogIn,
  LogOut,
  Rocket,
  Settings2,
  User,
} from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { getInitials } from "@/lib/helper";

type UserMenuType = {
  session: Session | null;
  logOutHandler: () => void;
};

export default function ComplexDropdownMenu({
  session,
  logOutHandler,
}: UserMenuType) {
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getInitials(session?.user.user_metadata.displayName) || "UN"}
          </AvatarFallback>
        </Avatar>
        <div className="text-start flex flex-col">
          <p className="text-sm font-medium">
            {session?.user.user_metadata.displayName}
          </p>
          <p className="text-xs text-muted-foreground">{session?.user.email}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-72">
        <DropdownMenuItem className="py-3">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(session?.user.user_metadata.displayName) || "UN"}
            </AvatarFallback>
          </Avatar>
          <div className="ml-1 flex flex-col">
            <p className="text-sm font-medium">
              {session?.user.user_metadata.displayName}
            </p>
            <p className="text-xs text-muted-foreground">
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logOutHandler}>
          <LogOut className="mr-1" /> خروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
