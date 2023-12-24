import { router } from "./trpc";
import { userRouter } from "./routers/user-router";
import { listRouter } from "./routers/list-router";

export const appRouter = router({
  user: userRouter,
  list: listRouter,
});

export type AppRouter = typeof appRouter;
