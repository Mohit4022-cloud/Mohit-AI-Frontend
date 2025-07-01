"use client";

import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="layout-height-16 app-border-bottom app-bg-card layout-flex layout-items-center layout-justify-between layout-pad-x-6">
      <div className="layout-flex layout-items-center layout-flex-grow layout-max-width-md">
        <Search className="layout-height-4 layout-width-4 app-text-secondary layout-margin-right-2" />
        <Input
          type="search"
          placeholder="Search leads, conversations..."
          className="app-border-0 app-focus-ring-0"
        />
      </div>

      <div className="layout-flex layout-items-center layout-gap-4">
        <Button variant="ghost" size="icon" className="layout-relative">
          <Bell className="layout-height-5 layout-width-5" />
          <span className="layout-absolute layout-top-1 layout-right-1 layout-height-2 layout-width-2 app-corner-circle app-bg-action" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="layout-height-5 layout-width-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="layout-width-56">
            <DropdownMenuLabel>
              <div>
                <p className="app-font-medium">{user?.name || "User"}</p>
                <p className="app-text-sm app-text-secondary">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Team Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
