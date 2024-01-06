import { z } from "zod";
import { db } from "~/lib/db";
import { privateProcedure } from "~/server/trpc";
import { getCart } from "~/utils/actions/get-cart";

export const modifyCart = privateProcedure
  .input(
    z.object({
      productId: z.string(),
      quantity: z.optional(z.number()),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { productId, quantity } = input;
    const { user } = ctx;
    const cart = await getCart(user.id);

    const existingCartItem = cart.items.find(
      (item) => item.productId === productId,
    );
    if (existingCartItem?.quantity === quantity) {
      return { message: "No changes detected." };
    }
    if (!!existingCartItem) {
      await db.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity },
      });
    }
    if (!existingCartItem) {
      await db.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: quantity ?? 0,
        },
      });
    }
  });
