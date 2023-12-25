"use client";

import { useState } from "react";
import { cn } from "~/lib/utils";

interface IProps {}

export function DesktopSidebar({}: IProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <article className={cn("fixed h-full", isCollapsed ? "w-10" : "w-14")}>
      desktop-sidebar
    </article>
  );
}
