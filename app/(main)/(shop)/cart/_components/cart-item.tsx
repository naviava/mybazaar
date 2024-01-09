"use client";

import { Separator } from "~/components/ui/separator";
import Image from "next/image";
import { useMemo } from "react";
import { useCart } from "~/hooks/use-cart";

interface IProps {
  productId: string;
}

export function CartItem({ productId }: IProps) {
  const { cartItem: item } = useCart({ productId });
  const imageUrl = useMemo(
    () =>
      !!item?.product.images.length
        ? item?.product.images[0].imageUrl
        : "/placeholder.jpg",
    [item],
  );

  return (
    <>
      <div className="flex justify-between gap-x-4">
        <div className="flex gap-x-2">
          <div className="relative hidden aspect-square w-[150px] md:block lg:w-[200px]">
            <Image
              fill
              src={imageUrl}
              alt={`Image for ${item?.product.name}`}
            />
          </div>
          <div>{item?.product.name}</div>
        </div>
        <div>Price</div>
      </div>
      <Separator className="mb-8 mt-4" />
    </>
  );
}
