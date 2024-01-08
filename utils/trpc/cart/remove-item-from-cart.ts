import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "~/lib/db";
import { privateProcedure } from "~/server/trpc";
import { fetchCart } from "~/utils/actions/fetch-cart";

export const removeItemFromCart = privateProcedure
  .input(z.string())
  .mutation(async ({ ctx, input }) => {
    const { user } = ctx;
    const productId = input;
    const cart = await fetchCart(user.id);

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to perform this action",
      });
    }
    if (!productId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Product ID is required",
      });
    }

    await db.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });
    return "Item removed from cart";
  });
