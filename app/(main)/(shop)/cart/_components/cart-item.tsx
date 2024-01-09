"use client";

import { Separator } from "~/components/ui/separator";
import Image from "next/image";
import { useMemo } from "react";
import { useCart } from "~/hooks/use-cart";
import { generatePriceTag } from "~/utils";

interface IProps {
  productId: string;
}

export function CartItem({ productId }: IProps) {
  const { cartItem: item, isFetching } = useCart({ productId });
  const imageUrl = useMemo(
    () =>
      !!item?.product.images.length
        ? item?.product.images[0].imageUrl
        : "/placeholder.jpg",
    [item],
  );

  // TODO: Add Skeleton Loader.
  if (isFetching) return <p>Loading...</p>;
  if (!item) return null;

  return (
    <>
      <div className="flex justify-between gap-x-4">
        <div className="flex flex-1 gap-x-2">
          <div className="relative hidden aspect-square w-[150px] md:block lg:w-[200px]">
            <Image
              fill
              src={imageUrl}
              alt={`Image for ${item?.product.name}`}
            />
          </div>
          <div className="flex flex-col justify-between">
            <h3 className="line-clamp-1 text-lg font-medium">
              {item?.product.name}
            </h3>
            <div>Actions</div>
          </div>
        </div>
        <div>{generatePriceTag(item.quantity * item?.product.price)}</div>
      </div>
      <Separator className="mb-8 mt-4" />
    </>
  );
}
