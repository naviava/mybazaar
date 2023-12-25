"use client";

import { Home, MoreHorizontal } from "lucide-react";
import { useDesktopSidebar } from "~/store/use-desktop-sidebar";

import { SidebarItem } from "./sidebar-item";
import { SidebarAccordion } from "./sidebar-accordion";

interface IProps {}

export function SidebarContent({}: IProps) {
  const { isCollapsed } = useDesktopSidebar((state) => state);

  return (
    <>
      <SidebarItem label="Home" href="/" icon={Home} />
      <h3 className="mt-6 px-4 py-2 font-bold uppercase text-muted-foreground">
        {isCollapsed ? <MoreHorizontal /> : "Manage Shop"}
      </h3>
      <div className="space-y-2">{!isCollapsed && <SidebarAccordion />}</div>
    </>
  );
}
