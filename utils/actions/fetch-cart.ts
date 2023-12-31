"use server";

import { db } from "~/lib/db";

export async function fetchCart(userId: string) {
  const existingCart = await db.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              category: true,
              images: true,
            },
          },
        },
      },
    },
  });
  if (!!existingCart) {
    return existingCart;
  }

  return await db.cart.create({
    data: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              category: true,
              images: true,
            },
          },
        },
      },
    },
  });
}
