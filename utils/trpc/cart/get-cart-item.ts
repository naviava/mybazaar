import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "~/lib/db";
import { privateProcedure } from "~/server/trpc";
import { fetchCart } from "~/utils/actions/fetch-cart";

export const getCartItem = privateProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const { user } = ctx;
    const productId = input;
    const cart = await fetchCart(user.id);

    const cartItem = await db.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });
    if (!cartItem) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Cart item not found",
      });
    }
    return cartItem;
  });
