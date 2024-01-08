import { privateProcedure } from "~/server/trpc";
import { fetchCart } from "~/utils/actions/fetch-cart";

export const getCart = privateProcedure.query(async ({ ctx }) => {
  const cart = await fetchCart(ctx.user.id);
  return cart;
});
