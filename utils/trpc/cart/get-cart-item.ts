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

    const cartItem = await db.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
      include: {
        product: {
          include: { images: true },
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
