"use client";

import { useCart } from "~/hooks/use-cart";
import { Separator } from "~/components/ui/separator";
import { CartActionButton } from "./cart-action-button";

interface IProps {
  productId: string;
}

export function CartActions({ productId }: IProps) {
  return (
    <div className="flex items-center gap-x-2">
      <div>Qty</div>
      <Separator orientation="vertical" />
      <CartActionButton action={() => {}}>Delete</CartActionButton>
      <Separator orientation="vertical" />
      <CartActionButton action={() => {}}>Add to Wishlist</CartActionButton>
      <Separator orientation="vertical" />
      <CartActionButton action={() => {}}>Share</CartActionButton>
    </div>
  );
}
