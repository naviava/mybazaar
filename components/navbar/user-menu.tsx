"use client";

import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { ManageAccount } from "./manage-account";

import { serverClient } from "~/app/_trpc/server-client";

interface Props {
  user: Awaited<ReturnType<typeof serverClient.users.getAuthProfile>>;
}

export function UserMenu({ user }: Props) {
  const router = useRouter();

  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger
        onClick={() => router.push("/login")}
        className="cursor-pointer"
      >
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
