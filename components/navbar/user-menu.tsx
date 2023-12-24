"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";

import { useMediaQuery } from "~/hooks/use-media-query";

import { DesktopUserMenu } from "./desktop-user-menu";
import { MobileUserMenu } from "./mobile-user-menu";

import { trpc } from "~/app/_trpc/client";

export const UserMenu = memo(_UserMenu);
function _UserMenu() {
  const router = useRouter();
  const { isDesktop } = useMediaQuery();
  const { data: user } = trpc.user.getAuthProfile.useQuery();

  const handleTriggerClick = useCallback(() => {
    if (!user) router.push("/login");
  }, [router, user]);

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
