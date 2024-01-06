import { Eye, Heart, ShoppingCart } from "lucide-react";
import { ActionButton } from "./action-button";
import { cn } from "~/lib/utils";

interface IProps {
  productId: string;
  isHover?: boolean;
  isStatic?: boolean;
}

export function ActionsMenu({ productId, isHover, isStatic }: IProps) {
  // TODO: Add add to card and wishlist functionality.
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
      <ActionButton isHover={isHover} productId={productId}>
        <Heart className="h-5 w-5 text-neutral-500" />
      </ActionButton>
      <ActionButton
        asChild
        href={`/products/${productId}`}
        isHover={isHover}
        productId={productId}
      >
        <Eye className="h-5 w-5 text-neutral-500" />
      </ActionButton>
      <ActionButton isHover={isHover} productId={productId}>
        <ShoppingCart className="h-5 w-5 text-neutral-500" />
      </ActionButton>
    </div>
  );
}
