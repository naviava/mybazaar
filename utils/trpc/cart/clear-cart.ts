import { db } from "~/lib/db";
import { privateProcedure } from "~/server/trpc";

export const clearCart = privateProcedure.mutation(async ({ ctx }) => {
  const { user } = ctx;
  await db.cartItem.deleteMany({
    where: {
      cart: { userId: user.id },
    },
  });
  return "Cart cleared.";
});
