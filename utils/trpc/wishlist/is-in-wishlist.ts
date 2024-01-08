import { z } from "zod";
import { db } from "~/lib/db";
import { privateProcedure } from "~/server/trpc";
import { fetchWishlist } from "~/utils/actions/fetch-wishlist";

export const isInWishlist = privateProcedure
  .input(z.string())
  .query(async ({ ctx, input: productId }) => {
    const { user } = ctx;
    if (!user) {
      return false;
    }

    const wishlist = await fetchWishlist(user.id);
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
