"use client";

import Link from "next/link";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { trpc } from "~/app/_trpc/client";

export function CartButton() {
  const { data: user } = trpc.user.getAuthProfile.useQuery();
  const { data: cart } = trpc.cart.getCart.useQuery();

  return (
    <Link href={!!user ? "/cart" : "/login"} className="relative">
      <LiaShoppingBagSolid size={32} />
      {!!cart?.items.length && (
        <div className="absolute -bottom-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-amz-yellow text-sm font-bold text-black">
          {cart.items.length}
        </div>
      )}
    </Link>
  );
}
