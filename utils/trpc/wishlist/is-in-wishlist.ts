import { z } from "zod";
import { db } from "~/lib/db";
import { privateProcedure } from "~/server/trpc";
import { getWishlist } from "~/utils/actions/get-wishlist";

export const isInWishlist = privateProcedure
  .input(z.string())
  .query(async ({ ctx, input: productId }) => {
    const { user } = ctx;
    if (!user) {
      return false;
    }

    const wishlist = await getWishlist(user.id);
    const existingItem = await db.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });
    return !!existingItem;
  });
