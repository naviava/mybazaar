import { router } from "~/server/trpc";

import { toggleItem } from "~/utils/trpc/wishlist/toggle-item";
import { getWishlist } from "~/utils/trpc/wishlist/get-wishlist";
import { isInWishlist } from "~/utils/trpc/wishlist/is-in-wishlist";
import { clearWishlist } from "~/utils/trpc/wishlist/clear-wishlist";

export const wishlistRouter = router({
  getWishlist,
  isInWishlist,
  toggleItem,
  clearWishlist,
});
