"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useSidebar } from "~/store/use-sidebar";

interface IProps {}

export function DesktopSidebar({}: IProps) {
  const { isCollapsed, toggleSidebar } = useSidebar((state) => state);

  return (
    <article
      className={cn(
        "fixed hidden h-full border-2 border-neutral-300 transition-all duration-300 ease-in-out xl:block",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <Button
        size="icon"
        variant="outline"
        onClick={toggleSidebar}
        className="absolute -right-5 top-2 rounded-full border border-neutral-400 bg-neutral-200 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-500"
      >
        {isCollapsed ? (
          <ArrowRightFromLine className="h-4 w-4" />
        ) : (
          <ArrowLeftFromLine className="h-4 w-4" />
        )}
      </Button>
      desktop-sidebar
    </article>
  );
}
