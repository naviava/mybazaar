import { db } from "~/lib/db";
import { publicProcedure } from "~/server/trpc";

export const getCategories = publicProcedure.query(async () => {
  const categories = await db.category.findMany();
  if (!categories.length) return [];
  return categories;
});
