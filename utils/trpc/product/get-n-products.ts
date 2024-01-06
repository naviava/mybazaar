import { z } from "zod";
import { db } from "~/lib/db";
import { publicProcedure } from "~/server/trpc";

export const getNProducts = publicProcedure
  .input(z.number())
  .query(async ({ input }) => {
    const products = await db.product.findMany({
      take: input,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        images: true,
      },
    });
    return products;
  });
