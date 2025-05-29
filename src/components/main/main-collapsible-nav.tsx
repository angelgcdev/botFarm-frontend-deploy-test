"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { ChevronDown, ChartSpline, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

type NavItemWithChildren = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  children?: NavItem[];
};

type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
};

export function CollapsibleNavMain({
  items,
}: {
  items: NavItemWithChildren[];
}) {
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});

  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              onClick={() => {
                router.push("/main/dashboard");
              }}
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground "
            >
              <ChartSpline />
              <span>Dashboard</span>
            </SidebarMenuButton>
            <Button
              onClick={() => {
                router.push("/main/dashboard");
              }}
              size="icon"
              className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <ChartSpline />
              <span className="sr-only">Create</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <React.Fragment key={item.title}>
              {item.children ? (
                <Collapsible
                  open={openItems[item.title] || false}
                  onOpenChange={(open) =>
                    setOpenItems((prev) => ({ ...prev, [item.title]: open }))
                  }
                  className="w-full"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className="justify-between"
                      >
                        <div className="flex items-center gap-2">
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            openItems[item.title] ? "rotate-180" : ""
                          }`}
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children.map((child) => (
                        <SidebarMenuSubItem key={child.title}>
                          <SidebarMenuSubButton asChild className="font-normal">
                            <a
                              href={child.url}
                              className="flex items-center gap-2"
                            >
                              {child.icon && <child.icon />}
                              <span>{child.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuItem>
                  <Link href={item.url}>
                    <SidebarMenuButton
                      className="focus:bg-gray-700"
                      tooltip={item.title}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              )}
            </React.Fragment>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
