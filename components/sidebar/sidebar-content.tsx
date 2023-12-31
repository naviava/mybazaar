"use client";

import { memo } from "react";
import { Home, MoreHorizontal } from "lucide-react";

import { useMediaQuery } from "~/hooks/use-media-query";
import { useDesktopSidebar } from "~/store/use-desktop-sidebar";

import { SidebarHoverCards } from "./sidebar-hover-cards";
import { SidebarAccordion } from "./sidebar-accordion";
import { SidebarItem } from "./sidebar-item";

interface IProps {
  handleCloseSheet?: () => void;
}

export const SidebarContent = memo(_SidebarContent);
function _SidebarContent({ handleCloseSheet }: IProps) {
  const { isDesktop } = useMediaQuery();
  const { isCollapsed } = useDesktopSidebar((state) => state);

  // if (!isMounted) return null;
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
        {!isDesktop && <SidebarAccordion handleCloseSheet={handleCloseSheet} />}
      </div>
    </>
  );
}
