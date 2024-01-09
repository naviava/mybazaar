"use client";

import { useCart } from "~/hooks/use-cart";

import { Separator } from "~/components/ui/separator";
import { PageHeading } from "~/components/page-heading";
import { ClearCartButton } from "~/components/clear-cart-button";
import { CartItem } from "./cart-item";

import { cn } from "~/lib/utils";

const BREADCRUMBS = [{ bcLabel: "Home", bcHref: "/" }];

export function AllItemsCart() {
  const { cart, isFetchingCart } = useCart({});

  return (
    <section className="flex-1 bg-white p-2 pb-10 md:px-4 lg:mx-0">
      <PageHeading
        label={
          !!cart && !!cart?.items.length
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
        {isFetchingCart && <p>Loading...</p>}
        {!isFetchingCart &&
          (!cart?.items.length ? (
            <p className="text-center">
              Add items to your cart to begin shopping.
            </p>
          ) : (
            <>
              {cart?.items.map((item) => (
                <CartItem
                  key={item.id}
                  productId={item.productId}
                  productName={item.product.name}
                  productPrice={item.product.price}
                  productCategory={item.product.category.name}
                  images={item.product.images}
                  quantity={item.quantity}
                />
              ))}
            </>
          ))}
      </div>
      {!cart?.items.length && <Separator className="mt-4" />}
      <div className="flex items-center justify-end">Subtotal (0 items): </div>
    </section>
  );
}
