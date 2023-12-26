"use client";

import { useMediaQuery } from "~/hooks/use-media-query";
import { useDesktopSidebar } from "~/store/use-desktop-sidebar";

import { cn } from "~/lib/utils";
import { memo } from "react";

interface IProps {
  children: React.ReactNode;
}

export const AdminPageWrapper = memo(_AdminPageWrapper);
function _AdminPageWrapper({ children }: IProps) {
  const { isDesktop } = useMediaQuery();
  const { isCollapsed } = useDesktopSidebar();

  return (
    <div
      className={cn(
        "w-full transition-all duration-300",
        isDesktop && (isCollapsed ? "pl-24" : "pl-72"),
      )}
    >
      <article
        className={cn("w-full pl-4 pr-10", isDesktop ? "py-14" : "py-8")}
      >
        {children}
      </article>
    </div>
  );
}
