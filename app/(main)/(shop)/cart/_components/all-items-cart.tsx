"use client";

import { Separator } from "~/components/ui/separator";
import { PageHeading } from "~/components/page-heading";
import { ClearCartButton } from "~/components/clear-cart-button";
import { CartItem } from "./cart-item";

import { cn } from "~/lib/utils";
import { serverClient } from "~/app/_trpc/server-client";
import { useCart } from "~/hooks/use-cart";

const BREADCRUMBS = [{ bcLabel: "Home", bcHref: "/" }];

export function AllItemsCart() {
  const { cart, isFetching } = useCart({});

  return (
    <section className="flex-1 bg-white p-2 pb-10 md:px-4 lg:mx-0">
      <PageHeading
        label={
          isFetching
            ? "Shopping Cart"
            : !!cart?.items.length
              ? "Shopping Cart"
              : "Your cart is empty"
        }
        breadcrumbs={BREADCRUMBS}
        currentBcLabel="Cart"
      />
      <div className={cn("-translate-y-14", !cart?.items.length && "hidden")}>
        <ClearCartButton className="px-0 text-sky-700 hover:text-[#ce7421]">
          Clear my Cart
        </ClearCartButton>
      </div>
      <div className={cn(!!cart?.items.length && "-mt-10")}>
        {/* TODO: Add skeleton loader. */}
        {isFetching && <p>Loading...</p>}
        {!isFetching && !cart?.items.length ? (
          <p className="text-center">
            Add items to your cart to begin shopping.
          </p>
        ) : (
          <>
            {cart?.items.map((item) => (
              <CartItem key={item.id} productId={item.productId} />
            ))}
          </>
        )}
      </div>
      {!cart?.items.length && <Separator className="mt-4" />}
      <div className="flex items-center justify-end">Subtotal (0 items): </div>
    </section>
  );
}
