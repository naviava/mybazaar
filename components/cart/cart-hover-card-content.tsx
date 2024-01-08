"use client";

import { trpc } from "~/app/_trpc/client";
import { CartHoverCardItem } from "./cart-hover-card-item";

export function CartHoverCardContent() {
  const { data: cart } = trpc.cart.getCart.useQuery();

  return (
    <div className="mb-2 space-y-2">
      <div className="h-1 w-full bg-amz-yellow-shaded" />
      {!cart?.items.length ? (
        <p className="text-center text-sm text-muted-foreground">
          Your cart is empty
        </p>
      ) : (
        cart.items.map((item) => (
          <CartHoverCardItem key={item.id} productId={item.id} />
        ))
      )}
    </div>
  );
}
