"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useCart } from "~/hooks/use-cart";

import { Button } from "~/components/ui/button";
import { LoaderSpinner } from "~/components/loader-spinner";
import { CartHoverCardItem } from "./cart-hover-card-item";

import { getCartTotals } from "~/utils";
import { trpc } from "~/app/_trpc/client";
import { CheckoutButton } from "../checkout-button";

const MAX_ITEMS = 4;

export function CartHoverCardContent() {
  const { cart, isFetchingCart, totalPrice } = useCart({});

  return (
    <div className="mb-2 space-y-2">
      <div className="h-1 w-full bg-amz-yellow-shaded" />
      <>
        {isFetchingCart ? (
          <div className="flex h-28 w-full flex-col items-center justify-center gap-y-4 text-muted-foreground">
            <LoaderSpinner className="h-6 w-6" />
            <p className="text-sm">Loading your cart items...</p>
          </div>
        ) : (
          <>
            {!cart?.items.length ? (
              <p className="text-center text-sm text-muted-foreground">
                Your cart is empty
              </p>
            ) : (
              cart?.items.map((item, idx) => {
                if (idx >= MAX_ITEMS) return null;
                return (
                  <CartHoverCardItem key={item.id} productId={item.productId} />
                );
              })
            )}
            <div>
              <p className="mb-1 text-center text-xs italic text-muted-foreground">
                {!!cart?.items.length &&
                  cart.items.length > MAX_ITEMS &&
                  `${cart.items.length - MAX_ITEMS} ${
                    cart.items.length - MAX_ITEMS === 1 ? "item" : "items"
                  } not shown above`}
              </p>
              {!!cart?.items.length && (
                <div className="flex items-center justify-between px-2">
                  <h3 className="font-medium">Total</h3>
                  <p className="font-semibold">{totalPrice}</p>
                </div>
              )}
            </div>
            {!!cart?.items.length && (
              <div className="flex flex-col gap-y-2 p-2">
                <Button asChild variant="outline">
                  <Link href="/cart">View Cart</Link>
                </Button>
                <CheckoutButton cartId={cart.id}>Checkout</CheckoutButton>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
}
