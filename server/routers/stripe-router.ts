import { router } from "~/server/trpc";
import { paymentCheckout } from "~/utils/trpc/stripe/payment-checkout";

export const stripeRouter = router({
  paymentCheckout,
});
