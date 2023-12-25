"use client";

import { useDesktopSidebar } from "~/store/use-desktop-sidebar";

import { CollapseButton } from "~/components/collapse-button";
import { SidebarContent } from "./sidebar-content";

import { cn } from "~/lib/utils";

interface IProps {}

export function DesktopSidebar({}: IProps) {
  const { isCollapsed, toggleSidebar } = useDesktopSidebar((state) => state);

  return (
    <article
      className={cn(
        "fixed hidden h-full border-2 border-neutral-300 bg-white transition-all duration-300 ease-in-out xl:block",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <CollapseButton
        toggleState={isCollapsed}
        onClickHandler={toggleSidebar}
      />
      <section className={cn("pt-16", isCollapsed ? "mx-3" : "mx-4")}>
        <SidebarContent />
      </section>
    </article>
  );
}
