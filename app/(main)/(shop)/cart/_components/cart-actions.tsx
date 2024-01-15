"use client";

import { memo, useCallback } from "react";

import { useCart } from "~/hooks/use-cart";
import { useWishlist } from "~/hooks/use-wishlist";

import { Separator } from "~/components/ui/separator";
import { CartActionButton } from "./cart-action-button";
import { toast } from "sonner";
import { useMediaQuery } from "~/hooks/use-media-query";
import { ExternalLink, Heart, Trash2 } from "lucide-react";

interface IProps {
  productId: string;
}

export const CartActions = memo(_CartActions);
function _CartActions({ productId }: IProps) {
  const { isMobile, isTab, isTabPro, isDesktop } = useMediaQuery();

  const { removeItemFromCart } = useCart({ productId });

  const { isInWishlist, toggleItem } = useWishlist({
    productId,
  });

  const handleShareLink = useCallback(() => {
    toast.success("Link copied to clipboard");
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_SITE_URL}/products/${productId}`,
    );
  }, [productId]);

  return (
    <div className="flex flex-nowrap items-center gap-x-2">
      <div>Qty</div>
      <Separator orientation="vertical" />
      <CartActionButton action={() => removeItemFromCart(productId)}>
        {isMobile ? <Trash2 className="h-4 w-4" /> : "Delete"}
      </CartActionButton>
      <Separator orientation="vertical" />
      <CartActionButton action={() => toggleItem(productId)}>
        {isMobile && (
          <Heart fill={isInWishlist ? "#075985" : "#fff"} className="h-4 w-4" />
        )}
        {!isMobile &&
          (isInWishlist ? "Remove from Wishlist" : "Add to Wishlist")}
      </CartActionButton>
      <Separator orientation="vertical" />
      <CartActionButton action={handleShareLink}>
        {isMobile ? <ExternalLink className="h-4 w-4" /> : "Share"}
      </CartActionButton>
    </div>
  );
}
