"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LucideIcon } from "lucide-react";

import { useMediaQuery } from "~/hooks/use-media-query";
import { useDesktopSidebar } from "~/store/use-desktop-sidebar";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface IProps {
  label: string;
  href: string;
  icon?: LucideIcon;
  isHoverCard?: boolean;
  handleClick?: () => void;
}

export const SidebarItem = memo(_SidebarItem);
function _SidebarItem({
  label,
  href,
  icon: Icon,
  isHoverCard,
  handleClick,
}: IProps) {
  const pathname = usePathname();
  const { isDesktop } = useMediaQuery();
  const { isCollapsed } = useDesktopSidebar((state) => state);
  const isActive = useMemo(() => pathname === href, [pathname, href]);

  return (
    <Button
      asChild
      variant="ghost"
      onClick={handleClick}
      className={cn(
        "group w-full justify-start",
        isCollapsed && isDesktop && "p-2",
        !isDesktop && "p-2",
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
              !isDesktop && "mr-4",
            )}
          />
        )}
        <span
          className={cn(
            " text-base text-muted-foreground md:text-lg",
            isDesktop && isCollapsed && !isHoverCard && "hidden",
            isActive && "text-sky-500",
          )}
        >
          {label}
        </span>
      </Link>
    </Button>
  );
}
