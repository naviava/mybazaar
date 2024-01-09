"use client";

import { memo, useMemo } from "react";

import { useCart } from "~/hooks/use-cart";
import { useWishlist } from "~/hooks/use-wishlist";

import { Separator } from "~/components/ui/separator";
import { CartActionButton } from "./cart-action-button";

interface IProps {
  productId: string;
}

export const CartActions = memo(_CartActions);
function _CartActions({ productId }: IProps) {
  const { removeItemFromCart } = useCart({ productId });

  const { isInWishlist, toggleItem } = useWishlist({
    productId,
  });

  return (
    <div className="flex items-center gap-x-2">
      <div>Qty</div>
      <Separator orientation="vertical" />
      <CartActionButton action={() => {}}>Delete</CartActionButton>
      <Separator orientation="vertical" />
      <CartActionButton action={() => toggleItem(productId)}>
        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </CartActionButton>
      <Separator orientation="vertical" />
      <CartActionButton action={() => {}}>Share</CartActionButton>
    </div>
  );
}
