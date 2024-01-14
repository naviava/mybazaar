"use client";

import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { trpc } from "~/app/_trpc/client";

interface IProps {
  children: React.ReactNode;
  cartId: string;
}

export function CheckoutButton({ children, cartId }: IProps) {
  const { mutate: handlePaymentCheckout } =
    trpc.stripe.paymentCheckout.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: ({ url }) => {
        if (!!url) window.location.href = url;
      },
    });

  return (
    <Button
      variant="amazon"
      onClick={() => handlePaymentCheckout({ cartId })}
      className="w-full rounded-xl"
    >
      {children}
    </Button>
  );
}
