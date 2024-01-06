import { router } from "~/server/trpc";
import { toggleItem } from "~/utils/trpc/wishlist/toggle-item";

export const wishlistRouter = router({
  toggleItem,
});
