"use client";

import Link from "next/link";
import { Home, LucideIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useMediaQuery } from "~/hooks/use-media-query";
import { useDesktopSidebar } from "~/store/use-desktop-sidebar";
import { cn } from "~/lib/utils";

interface IProps {
  label: string;
  href: string;
  icon?: LucideIcon;
  isHoverCard?: boolean;
}

export function SidebarItem({ label, href, icon: Icon, isHoverCard }: IProps) {
  const { isDesktop } = useMediaQuery();
  const { isCollapsed } = useDesktopSidebar((state) => state);

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "group w-full justify-start",
        isCollapsed && isDesktop && "p-2",
      )}
    >
      <Link href={href} className="flex items-center">
        {isCollapsed && isDesktop && !isHoverCard && (
          <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground group-hover:bg-blue-600" />
        )}
        {Icon && (
          <Icon
            className={cn(
              "h-4 w-4 text-muted-foreground",
              !isCollapsed && "mr-4",
              isCollapsed && "ml-2",
            )}
          />
        )}
        <span
          className={cn(
            "text-lg text-muted-foreground",
            isDesktop && isCollapsed && !isHoverCard && "hidden",
          )}
        >
          {label}
        </span>
      </Link>
    </Button>
  );
}
