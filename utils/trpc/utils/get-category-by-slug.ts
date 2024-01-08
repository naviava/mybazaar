import { z } from "zod";
import { db } from "~/lib/db";
import { publicProcedure } from "~/server/trpc";

export const getCategoryBySlug = publicProcedure
  .input(z.string())
  .query(async ({ input }) => {
    const category = await db.category.findUnique({
      where: { slug: input },
    });
    if (!category) return null;
    return category;
  });
