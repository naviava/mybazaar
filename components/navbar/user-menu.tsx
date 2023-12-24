"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";

import { useIsMounted } from "usehooks-ts";
import { useMediaQuery } from "~/hooks/use-media-query";

import { DesktopUserMenu } from "./desktop-user-menu";
import { MobileUserMenu } from "./mobile-user-menu";

import { trpc } from "~/app/_trpc/client";

export function UserMenu() {
  const router = useRouter();
  const isMounted = useIsMounted();
  const { isDesktop } = useMediaQuery();
  const { data: user } = trpc.user.getAuthProfile.useQuery();

  const handleTriggerClick = useCallback(() => {
    if (!user) router.push("/login");
  }, [router, user]);

  if (!isMounted) return null;
  return (
    <>
      {isDesktop ? (
        <DesktopUserMenu
          userName={user?.name}
          handleTriggerClick={handleTriggerClick}
        />
      ) : (
        <MobileUserMenu userName={user?.name} />
      )}
    </>
  );
}
