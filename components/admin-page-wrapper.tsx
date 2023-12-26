"use client";

import { memo } from "react";

import { useIsMounted } from "~/hooks/use-is-mounted";
import { useMediaQuery } from "~/hooks/use-media-query";
import { useDesktopSidebar } from "~/store/use-desktop-sidebar";

import { cn } from "~/lib/utils";

interface IProps {
  children: React.ReactNode;
}

export const AdminPageWrapper = memo(_AdminPageWrapper);
function _AdminPageWrapper({ children }: IProps) {
  const isMounted = useIsMounted();
  const { isDesktop } = useMediaQuery();
  const { isCollapsed } = useDesktopSidebar();

  if (!isMounted) return null;
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
