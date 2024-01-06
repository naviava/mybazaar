import { router } from "~/server/trpc";
import { addToCart } from "~/utils/trpc/cart/add-to-cart";

export const cartRouter = router({
  addToCart,
});
