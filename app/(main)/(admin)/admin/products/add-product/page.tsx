"use client";

import { useMediaQuery } from "~/hooks/use-media-query";
import { useDesktopSidebar } from "~/store/use-desktop-sidebar";

import { PageHeading } from "~/components/page-heading";
import { cn } from "~/lib/utils";

export default function AddProductPage() {
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
        <PageHeading />
      </article>
    </div>
  );
}
