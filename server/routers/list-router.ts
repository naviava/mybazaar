import { router } from "~/server/trpc";
import { getCategories } from "~/utils/trpc/list/get-categories";

export const listRouter = router({
  getCategories,
});
