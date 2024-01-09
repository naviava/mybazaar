import { Button } from "~/components/ui/button";
import { CartSubtotal } from "./cart-subtotal";
import { serverClient } from "~/app/_trpc/server-client";

export async function CartSubtotalCard() {
  const cart = await serverClient.cart.getCart();

  if (!cart || !cart.items.length) {
    return null;
  }

  return (
    <section className="hidden h-fit w-[300px] space-y-4 bg-white p-4 lg:block">
      <CartSubtotal />
      <Button variant="amazon" className="w-full rounded-xl">
        Proceed to Buy
      </Button>
    </section>
  );
}
