import { db } from "~/lib/db";
import { privateProcedure } from "~/server/trpc";

export const getWishlist = privateProcedure.query(async ({ ctx }) => {
  const { user } = ctx;
  const wishlist = await db.wishlist.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true,
              category: true,
            },
          },
        },
      },
    },
  });
  return wishlist;
});
