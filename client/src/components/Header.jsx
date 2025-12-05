import { Bell, ChevronDown, Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header({ userName = "Pradeep", userRole = "Admin" }) {
  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 sticky top-0 z-[9999]">
      <SidebarTrigger data-testid="button-sidebar-toggle">
        <Menu className="w-5 h-5 text-gray-600" />
      </SidebarTrigger>

      <div className="flex items-center gap-4">
        <button 
          className="relative p-2 hover:bg-gray-100 rounded-lg"
          data-testid="button-notifications"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
            6
          </span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer" data-testid="user-profile-dropdown">
          <Avatar className="w-10 h-10">
            <AvatarImage src="" alt={userName} />
            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-600 text-white">
              {userName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="font-semibold text-sm text-gray-800" data-testid="text-username">{userName}</p>
            <p className="text-xs text-gray-500" data-testid="text-userrole">{userRole}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
