"use client";

import { ElementRef, memo, useCallback, useRef } from "react";

import {
  Popover,
  PopoverClose,
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
  const closeRef = useRef<ElementRef<"button">>(null);
  const handleClose = useCallback(() => closeRef.current?.click(), []);

  return (
    <Popover>
      <PopoverTrigger>
        <UserMenuTrigger userName={userName} />
      </PopoverTrigger>
      <PopoverContent className="rounded-sm py-2">
        <ManageAccount handleClose={handleClose} />
        <PopoverClose ref={closeRef} className="hidden" />
      </PopoverContent>
    </Popover>
  );
}
