"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpCircleIcon,
  ClockIcon,
  // LogOutIcon,
  SmartphoneIcon,
  // UserIcon,
  CalendarRange,
} from "lucide-react";
// import { NavSecondary } from "./nav-secondary";
import { MainNavUser } from "./main-nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CollapsibleNavMain } from "./main-collapsible-nav";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

const data = {
  navMain: [
    // {
    //   title: "Redes Sociales",
    //   url: "#",
    //   icon: GlobeIcon,
    //   children: [
    //     {
    //       title: "TikTok",
    //       url: "#",
    //       icon: TikTokIcon,
    //     },
    //     {
    //       title: "Facebook",
    //       url: "#",
    //       icon: FacebookIcon,
    //     },
    //   ],
    // },
    {
      title: "Programar Interacciones",
      url: "/main/schedule-posts",
      icon: CalendarRange,
      isActive: true,
    },
    {
      title: "Dispositivos",
      url: "/main/devices",
      icon: SmartphoneIcon,
    },
    {
      title: "Historial",
      url: "/main/history",
      icon: ClockIcon,
    },
  ],
};

export function MainSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [email, setEmail] = useState("usuario@ejemplo.com");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setEmail(email);
    }
  }, []);

  const user = {
    email,
    avatar: "/avatar/perfil.png",
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/main">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">
                  Bots Redes Sociales
                </span>
              </Link>
            </SidebarMenuButton>
            <ModeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <CollapsibleNavMain items={data.navMain} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <MainNavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
