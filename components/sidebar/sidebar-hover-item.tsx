import { LucideIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

interface IProps {
  children: React.ReactNode;
  icon: LucideIcon;
}

export function SidebarHoverItem({ children, icon: Icon }: IProps) {
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger className="p-0">
        <Button variant="ghost" className="group w-full p-1">
          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-muted-foreground group-hover:bg-blue-600" />
          <Icon className="h-4 w-4 text-muted-foreground" />
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
