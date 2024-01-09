"use client";

import { memo } from "react";
import { Eye, Heart, ShoppingCart } from "lucide-react";

import { useCart } from "~/hooks/use-cart";
import { useWishlist } from "~/hooks/use-wishlist";

import { ActionButton } from "./action-button";
import { cn } from "~/lib/utils";

interface IProps {
  productId: string;
  isHover?: boolean;
  isStatic?: boolean;
}

export const ActionsMenu = memo(_ActionsMenu);
function _ActionsMenu({ productId, isHover, isStatic }: IProps) {
  const { modifyCart, isLoading } = useCart({ productId });
  const { isInWishlist, toggleItem } = useWishlist({ productId });

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1",
        // Toggle these classes for development -> hidden group-hover/card:flex
        isHover &&
          "absolute right-2 top-2 hidden flex-col transition-all lg:group-hover/card:flex",
        isStatic && "lg:hidden",
      )}
    >
      <ActionButton
        isHover={isHover}
        productId={productId}
        disabled={isLoading}
        onClick={() => toggleItem(productId)}
      >
        <Heart
          fill={isInWishlist ? "#e3bb09" : "none"}
          className={cn(
            "h-5 w-5 text-neutral-500",
            isInWishlist && "text-amz-yellow-shaded drop-shadow-md",
          )}
        />
      </ActionButton>
      <ActionButton
        asChild
        href={`/products/${productId}`}
        isHover={isHover}
        productId={productId}
        disabled={isLoading}
      >
        <Eye className="h-5 w-5 text-neutral-500" />
      </ActionButton>
      <ActionButton
        isHover={isHover}
        productId={productId}
        disabled={isLoading}
        onClick={() => modifyCart({ productId })}
      >
        <ShoppingCart className="h-5 w-5 text-neutral-500" />
      </ActionButton>
    </div>
  );
}
