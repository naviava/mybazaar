"use client";

import { useCallback } from "react";
import Image from "next/image";

import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

import { trpc } from "~/app/_trpc/client";
import { generatePriceTag } from "~/utils";

interface IProps {
  productId: string;
}

export function CartHoverCardItem({ productId }: IProps) {
  const utils = trpc.useUtils();
  const { data: cartItem } = trpc.cart.getCartItem.useQuery(productId);

  const { mutate: removeItemFromCart } =
    trpc.cart.removeItemFromCart.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: (data) => {
        utils.cart.getCart.invalidate();
        toast.success(data);
      },
    });

  const handleRemoveCartItem = useCallback(() => {
    removeItemFromCart(productId);
  }, [removeItemFromCart, productId]);

  if (!cartItem) return null;
  return (
    <div className="px-2">
      <div className="relative flex items-center justify-between gap-x-4">
        <div className="flex items-center gap-x-2">
          <div className="relative aspect-square w-16 shrink-0">
            <Image
              fill
              src={
                !!cartItem.product.images.length
                  ? cartItem.product.images[0].imageUrl
                  : "/placeholder.jpg"
              }
              alt={`Image for ${cartItem.product.name}`}
            />
          </div>
          <div className="text-sm">
            <p className="line-clamp-1 text-muted-foreground">
              {cartItem.quantity}x {cartItem.product.name}
            </p>
            <p className="font-semibold">
              {generatePriceTag(cartItem.quantity * cartItem.product.price)}
            </p>
          </div>
        </div>
        <Button
          variant="link"
          onClick={handleRemoveCartItem}
          className="group p-0 px-1"
        >
          <Trash2 className="h-4 w-4 text-muted-foreground group-hover:text-rose-600" />
        </Button>
      </div>
      <Separator className="my-2" />
    </div>
  );
}
