import { router } from "~/server/trpc";

import { getCart } from "~/utils/trpc/cart/get-cart";
import { clearCart } from "~/utils/trpc/cart/clear-cart";
import { modifyCart } from "~/utils/trpc/cart/modify-cart";

export const cartRouter = router({
  getCart,
  modifyCart,
  clearCart,
});
