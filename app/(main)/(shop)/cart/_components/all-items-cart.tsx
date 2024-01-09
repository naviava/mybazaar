import { Button } from "~/components/ui/button";
import { PageHeading } from "~/components/page-heading";
import { serverClient } from "~/app/_trpc/server-client";
import { cn } from "~/lib/utils";
import { ClearCartButton } from "~/components/clear-cart-button";

const BREADCRUMBS = [{ bcLabel: "Home", bcHref: "/" }];

export async function AllItemsCart() {
  const cart = await serverClient.cart.getCart();

  return (
    <section className="flex-1 bg-white p-2 md:px-4 lg:mx-0">
      <PageHeading
        label={!!cart.items.length ? "Shopping Cart" : "Your cart is empty"}
        breadcrumbs={BREADCRUMBS}
        currentBcLabel="Cart"
      />
      <div className={cn("-translate-y-14", !cart.items.length && "hidden")}>
        <ClearCartButton className="px-0 text-sky-700 hover:text-[#ce7421]">
          Clear my Cart
        </ClearCartButton>
      </div>
      <div className={cn(!!cart.items.length && "-mt-10")}>A</div>
    </section>
  );
}
