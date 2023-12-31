import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { db } from "~/lib/db";
import { privateProcedure } from "~/server/trpc";
import { fetchWishlist } from "~/utils/actions/fetch-wishlist";

export const toggleItem = privateProcedure
  .input(z.string())
  .mutation(async ({ ctx, input }) => {
    const productId = input;

    const { user } = ctx;
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to do this",
      });
    }

    const wishlist = await fetchWishlist(user.id);
    if (!wishlist) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error getting wishlist. Try again later.",
      });
    }

    const existingItem = await db.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });
    if (!!existingItem) {
      await db.wishlistItem.delete({
        where: {
          id: existingItem.id,
          wishlistId: wishlist.id,
        },
      });
      return "Removed from wishlist.";
    } else {
      await db.wishlistItem.create({
        data: {
          productId,
          wishlistId: wishlist.id,
        },
      });
      return "Added to wishlist.";
    }
  });
