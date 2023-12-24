import { memo } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { ManageAccount } from "./manage-account";
import { UserMenuTrigger } from "./user-menu-trigger";

interface IProps {
  userName: string | undefined;
  handleTriggerClick: () => void;
}

export const DesktopUserMenu = memo(_DesktopUserMenu);
function _DesktopUserMenu({ userName, handleTriggerClick }: IProps) {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger onClick={handleTriggerClick} className="cursor-pointer">
        <UserMenuTrigger userName={userName} />
      </HoverCardTrigger>
      <HoverCardContent className="rounded-sm py-2">
        <ManageAccount />
      </HoverCardContent>
    </HoverCard>
  );
}
