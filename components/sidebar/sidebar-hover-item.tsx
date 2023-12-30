import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { cn } from "~/lib/utils";

interface IProps {
  children: React.ReactNode;
  icon: LucideIcon;
  groupHref?: string;
}

export function SidebarHoverItem({ children, icon: Icon, groupHref }: IProps) {
  const pathname = usePathname();
  const isActive = useMemo(
    () => pathname.startsWith(groupHref ?? ""),
    [pathname, groupHref],
  );

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger className="p-0">
        <Button variant="ghost" className="group w-full p-1">
          <div
            className={cn(
              "mr-2 h-1.5 w-1.5 rounded-full bg-muted-foreground group-hover:bg-sky-600",
              isActive && "bg-sky-600",
            )}
          />
          <Icon
            className={cn(
              "h-4 w-4 text-muted-foreground",
              isActive && "text-sky-600",
            )}
          />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        side="right"
        sideOffset={18}
        align="start"
        className="px-2 py-1"
      >
        {children}
      </HoverCardContent>
    </HoverCard>
  );
}
