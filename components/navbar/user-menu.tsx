"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { ManageAccount } from "./manage-account";

import { trpc } from "~/app/_trpc/client";

export const UserMenu = memo(_UserMenu);
function _UserMenu() {
  const router = useRouter();
  const { data: user } = trpc.user.getAuthProfile.useQuery();

  const handleTriggerClick = useCallback(() => {
    if (!user) router.push("/login");
    return null;
  }, [router, user]);

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger onClick={handleTriggerClick} className="cursor-pointer">
        <div className="text-sm">Hello, {user ? user.name : "sign in"}</div>
        <div className="flex items-center font-semibold">
          Manage Account
          <ChevronDown className="ml-1 h-4 w-4" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="rounded-sm">
        <ManageAccount />
      </HoverCardContent>
    </HoverCard>
  );
}
