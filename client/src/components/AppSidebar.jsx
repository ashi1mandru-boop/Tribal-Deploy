import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  ClipboardList,
  ListOrdered,
  AlertTriangle,
  CalendarDays,
  BarChart3,
  Settings2,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Orders", url: "/orders", icon: ClipboardList },
  { title: "Orders Que", url: "/orders-queue", icon: ListOrdered },
  { title: "Missing Orders", url: "/missing-orders", icon: AlertTriangle },
  { title: "Dispatch Dates", url: "/dispatch-dates", icon: CalendarDays },
];

const secondaryNavItems = [
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Attributes", url: "/attributes", icon: Settings2 },
   { title: "Data-Base", url: "/database", icon: Settings2 },
];

const footerNavItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Logout", url: "/login", icon: LogOut },
];

export function AppSidebar() {
  const [location] = useLocation();

  const isActive = (url) => {
    if (url === "/") return location === "/";
    return location.startsWith(url);
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6">
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold italic text-gray-800" style={{ fontFamily: 'serif' }}>
            Tribal
          </span>
        </div>
        <p className="text-[10px] text-center text-gray-500 tracking-widest uppercase">Arts & Films</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={isActive(item.url) ? "bg-[#4880ff] text-white " : ""}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={isActive(item.url) ? "bg-[#4880ff] text-white " : ""}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200">
        <SidebarMenu>
          {footerNavItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                data-testid={`nav-${item.title.toLowerCase()}`}
              >
                <Link href={item.url}>
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
