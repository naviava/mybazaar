import { z } from "zod";
import { db } from "~/lib/db";
import { privateProcedure } from "~/server/trpc";
import { fetchCart } from "~/utils/actions/fetch-cart";

export const modifyCart = privateProcedure
  .input(
    z.object({
      productId: z.string(),
      quantity: z.optional(z.number()),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { productId } = input;
    const quantity = input.quantity ?? 1;
    const { user } = ctx;
    const cart = await fetchCart(user.id);

    const existingCartItem = cart.items.find(
      (item) => item.productId === productId,
    );
    if (!!quantity && existingCartItem?.quantity === quantity) {
      return { message: "No changes detected." };
    }
    if (!!existingCartItem) {
      const cartItem = await db.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity },
      });
      return cartItem;
    } else {
      const cartItem = await db.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
      return cartItem;
    }
  });
