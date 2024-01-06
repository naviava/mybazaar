import { router } from "./trpc";

import { userRouter } from "./routers/user-router";
import { cartRouter } from "./routers/cart-router";
import { utilsRouter } from "./routers/utils-router";
import { productRouter } from "./routers/product-router";

export const appRouter = router({
  user: userRouter,
  utils: utilsRouter,
  product: productRouter,
  cart: cartRouter,
});

export type AppRouter = typeof appRouter;
