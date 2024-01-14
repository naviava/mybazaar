import { Button } from "~/components/ui/button";
import { CartSubtotal } from "./cart-subtotal";
import { serverClient } from "~/app/_trpc/server-client";
import { trpc } from "~/app/_trpc/client";
import { toast } from "sonner";

export async function CartSubtotalCard() {
  const cart = await serverClient.cart.getCart();

  const { mutate: handlePaymentCheckout } =
    trpc.stripe.paymentCheckout.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: ({ url }) => {
        if (!!url) window.location.href = url;
      },
    });

  if (!cart || !cart.items.length) {
    return null;
  }

  return (
    <section className="hidden h-fit w-[300px] space-y-4 bg-white p-4 lg:block">
      <CartSubtotal />
      <Button
        variant="amazon"
        onClick={() => handlePaymentCheckout({ cartId: cart.id })}
        className="w-full rounded-xl"
      >
        Proceed to Buy
      </Button>
    </section>
  );
}
