"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { trpc } from "~/app/_trpc/client";
import { Separator } from "~/components/ui/separator";

interface IProps {
  productId: string;
}

export function CartHoverCardItem({ productId }: IProps) {
  const { data: cartItem } = trpc.cart.getCartItem.useQuery(productId);
  if (!cartItem) return null;

  return (
    <div className="px-2">
      <div className="relative flex items-center">
        <div className="relative aspect-square w-16">
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
        <div>Details</div>
        <div>
          <Trash2 />
        </div>
      </div>
      <Separator className="my-2" />
    </div>
  );
}
