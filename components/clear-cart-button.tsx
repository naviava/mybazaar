"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { trpc } from "~/app/_trpc/client";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface IProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "amazon";
}

export function ClearCartButton({
  children,
  className,
  variant = "link",
  size = "sm",
}: IProps) {
  const utils = trpc.useUtils();
  const { mutate: clearCart } = trpc.cart.clearCart.useMutation({
    onError: () => toast.error("Error clearing cart. Try again later."),
    onSuccess: () => {
      utils.cart.getCart.invalidate();
      toast.success("Cart cleared. Your shopping cart is now empty.");
    },
  });

  const handleClearCart = useCallback(() => {
    clearCart();
  }, [clearCart]);

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleClearCart}
      className={cn(className)}
    >
      {children}
    </Button>
  );
}
