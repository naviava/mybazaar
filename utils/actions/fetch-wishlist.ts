"use server";

import { db } from "~/lib/db";

export async function fetchWishlist(userId: string) {
  const existingWishlist = await db.wishlist.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });
  if (!!existingWishlist) {
    return existingWishlist;
  }
  return await db.wishlist.create({
    data: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });
}
