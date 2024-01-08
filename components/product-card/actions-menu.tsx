"use client";

import { useCallback } from "react";

import { toast } from "sonner";
import { Eye, Heart, ShoppingCart } from "lucide-react";

import { ActionButton } from "./action-button";
import { trpc } from "~/app/_trpc/client";
import { cn } from "~/lib/utils";

interface IProps {
  productId: string;
  isHover?: boolean;
  isStatic?: boolean;
}

export function ActionsMenu({ productId, isHover, isStatic }: IProps) {
  const utils = trpc.useUtils();
  const { data: isInWishlist } = trpc.wishlist.isInWishlist.useQuery(productId);

  const { mutate: modifyCart, isLoading } = trpc.cart.modifyCart.useMutation({
    onError: () => toast.error("Something went wrong."),
    onSuccess: () => {
      utils.cart.getCart.invalidate();
      toast.success("Added to cart.");
    },
  });
  const handleModifyCart = useCallback(() => {
    modifyCart({ productId });
  }, [modifyCart, productId]);

  const { mutate: toggleItem } = trpc.wishlist.toggleItem.useMutation({
    onError: ({ message }) => toast.error(message),
    onSuccess: (data) => {
      utils.wishlist.isInWishlist.invalidate(productId);
      toast.success(data);
    },
  });
  const handleToggleItem = useCallback(() => {
    toggleItem(productId);
  }, [toggleItem, productId]);

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
        onClick={handleToggleItem}
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
        onClick={handleModifyCart}
      >
        <ShoppingCart className="h-5 w-5 text-neutral-500" />
      </ActionButton>
    </div>
  );
}
