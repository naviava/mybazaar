import { memo } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ManageAccount } from "./manage-account";
import { UserMenuTrigger } from "./user-menu-trigger";

interface IProps {
  userName: string | undefined;
}

export const MobileUserMenu = memo(_MobileUserMenu);
function _MobileUserMenu({ userName }: IProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <UserMenuTrigger userName={userName} />
      </PopoverTrigger>
      <PopoverContent className="rounded-sm py-2">
        <ManageAccount />
      </PopoverContent>
    </Popover>
  );
}
