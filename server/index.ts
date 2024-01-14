import { router } from "./trpc";

import { userRouter } from "./routers/user-router";
import { cartRouter } from "./routers/cart-router";
import { utilsRouter } from "./routers/utils-router";
import { stripeRouter } from "./routers/stripe-router";
import { productRouter } from "./routers/product-router";
import { wishlistRouter } from "./routers/wishlist-router";

export const appRouter = router({
  user: userRouter,
  utils: utilsRouter,
  product: productRouter,
  cart: cartRouter,
  wishlist: wishlistRouter,
  stripe: stripeRouter,
});

export type AppRouter = typeof appRouter;
