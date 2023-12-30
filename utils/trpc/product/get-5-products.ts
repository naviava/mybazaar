import { db } from "~/lib/db";
import { publicProcedure } from "~/server/trpc";

export const get5Products = publicProcedure.query(async () => {
  const products = await db.product.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      images: true,
    },
  });
  return products;
});
