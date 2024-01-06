"use client";

import { Eye, Heart, ShoppingCart } from "lucide-react";
import { ActionButton } from "./action-button";

import { cn } from "~/lib/utils";
import { trpc } from "~/app/_trpc/client";
import { useCallback } from "react";

interface IProps {
  productId: string;
  isHover?: boolean;
  isStatic?: boolean;
}

export function ActionsMenu({ productId, isHover, isStatic }: IProps) {
  const { mutate: modifyCart, isLoading } = trpc.cart.modifyCart.useMutation();
  const handleModifyCart = useCallback(() => {
    modifyCart({
      productId,
      quantity: 1,
    });
  }, [modifyCart, productId]);

  // TODO: Add wishlist functionality.
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
      >
        <Heart className="h-5 w-5 text-neutral-500" />
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
        onClick={handleModifyCart}
      >
        <ShoppingCart className="h-5 w-5 text-neutral-500" />
      </ActionButton>
    </div>
  );
}
