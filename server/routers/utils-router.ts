import { router } from "~/server/trpc";
import { getCategories } from "~/utils/trpc/utils/get-categories";
import { getCategoryBySlug } from "~/utils/trpc/utils/get-category-by-slug";

export const utilsRouter = router({
  getCategories,
  getCategoryBySlug,
});
