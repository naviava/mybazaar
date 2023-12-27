import { z } from "zod";
import { db } from "~/lib/db";
import { publicProcedure } from "~/server/trpc";

export const getProductById = publicProcedure
  .input(z.string().min(1))
  .query(async ({ input }) => {
    const product = await db.product.findUnique({
      where: { id: input },
      include: {
        category: true,
        images: true,
      },
    });

    if (!product) return undefined;
    return product;
  });
