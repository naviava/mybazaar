"use client";

import { useCallback } from "react";
import { Button } from "~/components/ui/button";
import { useCart } from "~/hooks/use-cart";
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
  const { clearCart } = useCart({});

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
