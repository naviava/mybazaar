"use client";

import { useMediaQuery } from "~/hooks/use-media-query";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { CartButton } from "~/components/cart/cart-button";
import { CartHoverCardContent } from "~/components/cart/cart-hover-card-content";

import { trpc } from "~/app/_trpc/client";

export function Cart() {
  const { data: user } = trpc.user.getAuthProfile.useQuery();
  const { isTabPro, isDesktop } = useMediaQuery();

  if (!user || (!isTabPro && !isDesktop)) return <CartButton />;

  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer">
        <CartButton />
      </HoverCardTrigger>
      <HoverCardContent
        align="end"
        alignOffset={-15}
        className="mt-1 rounded-none p-0"
      >
        <CartHoverCardContent />
      </HoverCardContent>
    </HoverCard>
  );
}
