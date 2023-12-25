"use client";

import { Home, MoreHorizontal } from "lucide-react";

import { useMediaQuery } from "~/hooks/use-media-query";
import { useDesktopSidebar } from "~/store/use-desktop-sidebar";

import { SidebarHoverCards } from "./sidebar-hover-cards";
import { SidebarAccordion } from "./sidebar-accordion";
import { SidebarItem } from "./sidebar-item";

export function SidebarContent() {
  const { isDesktop } = useMediaQuery();
  const { isCollapsed } = useDesktopSidebar((state) => state);

  return (
    <>
      <SidebarItem label="Home" href="/" icon={Home} />
      <h3 className="mt-6 px-4 py-2 font-bold uppercase text-muted-foreground">
        {isCollapsed && isDesktop ? <MoreHorizontal /> : "Manage Shop"}
      </h3>
      <div className="mt-4 space-y-4">
        {!isCollapsed && isDesktop ? (
          <SidebarAccordion />
        ) : (
          <div className="hidden xl:block">
            <SidebarHoverCards />
          </div>
        )}
        {!isDesktop && <SidebarAccordion />}
      </div>
    </>
  );
}
