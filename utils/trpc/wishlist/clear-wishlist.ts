import { db } from "~/lib/db";
import { privateProcedure } from "~/server/trpc";

export const clearWishlist = privateProcedure.mutation(async ({ ctx }) => {
  const { user } = ctx;
  await db.wishlistItem.deleteMany({
    where: {
      wishlist: { userId: user.id },
    },
  });
  return "Wishlist cleared.";
});
