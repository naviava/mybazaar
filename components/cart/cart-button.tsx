"use client";

import { LiaShoppingBagSolid } from "react-icons/lia";
import { trpc } from "~/app/_trpc/client";

export function CartButton() {
  const { data: cart } = trpc.cart.getCart.useQuery();

  return (
    <>
      <LiaShoppingBagSolid size={32} />
      {!!cart?.items.length && (
        <div className="absolute -bottom-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-amz-yellow text-sm font-bold text-black">
          {cart.items.length}
        </div>
      )}
    </>
  );
}
