import { router } from "~/server/trpc";
import { modifyCart } from "~/utils/trpc/cart/modify-cart";

export const cartRouter = router({
  modifyCart,
});
