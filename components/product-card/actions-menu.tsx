import Link from "next/link";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface IProps {
  productId: string;
  isHover?: boolean;
  isStatic?: boolean;
}

export function ActionsMenu({ productId, isHover, isStatic }: IProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1",
        // Toggle these classes for development -> hidden group-hover/card:flex
        isHover &&
          "absolute right-2 top-2 hidden flex-col transition-all group-hover/card:flex",
        isStatic && "",
      )}
    >
      <Button
        type="button"
        variant="link"
        className={cn("h-8 w-8 p-0", isHover && "bg-white")}
      >
        <Heart className="h-5 w-5 text-neutral-500" />
      </Button>
      <Button
        asChild
        type="button"
        variant="link"
        className={cn("h-8 w-8 p-0", isHover && "bg-white")}
      >
        <Link href={`/products/${productId}`}>
          <Eye className="h-5 w-5 text-neutral-500" />
        </Link>
      </Button>
      <Button
        type="button"
        variant="link"
        className={cn("h-8 w-8 p-0", isHover && "bg-white")}
      >
        <ShoppingCart className="h-5 w-5 text-neutral-500" />
      </Button>
    </div>
  );
}
