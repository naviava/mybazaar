import { router } from "~/server/trpc";
import { getCategories } from "~/utils/trpc/utils/get-categories";

export const utilsRouter = router({
  getCategories,
});
