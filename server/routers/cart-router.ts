import { router } from "~/server/trpc";

import { clearCart } from "~/utils/trpc/cart/clear-cart";
import { modifyCart } from "~/utils/trpc/cart/modify-cart";

export const cartRouter = router({
  modifyCart,
  clearCart,
});
