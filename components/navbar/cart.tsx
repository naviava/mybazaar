"use client";

import Link from "next/link";
import { useMediaQuery } from "~/hooks/use-media-query";
import { CartButton } from "~/components/cart/cart-button";
import { trpc } from "~/app/_trpc/client";

export function Cart() {
  const { data: user } = trpc.user.getAuthProfile.useQuery();
  const { isTabPro, isDesktop } = useMediaQuery();

  if (!isTabPro && !isDesktop)
    return (
      <Link href={!!user ? "/cart" : "/login"} className="relative">
        <CartButton />
      </Link>
    );

  return <div>Cart</div>;
}
