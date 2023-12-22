import { publicProcedure, router } from "./trpc";
import { userRouter } from "./routers/user-router";

export const appRouter = router({
  users: userRouter,
});

export type AppRouter = typeof appRouter;
