"use client";

import { Separator } from "~/components/ui/separator";
import Image from "next/image";
import { useMemo } from "react";
import { useCart } from "~/hooks/use-cart";
import { generatePriceTag } from "~/utils";
import { CartActions } from "./cart-actions";
import { ProductImage } from "@prisma/client";
import { ProductImageWithTimestampsAsString } from "~/types";

interface IProps {
  productId: string;
  productName: string;
  productPrice: number;
  productCategory: string;
  images: ProductImageWithTimestampsAsString[];
  quantity: number;
}

export function CartItem({
  productId,
  productName,
  productPrice,
  productCategory,
  images,
  quantity,
}: IProps) {
  const imageUrl = useMemo(
    () => (!!images.length ? images[0].imageUrl : "/placeholder.jpg"),
    [images],
  );

  return (
    <>
      <div className="flex justify-between gap-x-4">
        <div className="flex flex-1 gap-x-2">
          <div className="relative hidden aspect-square w-[150px] md:block lg:w-[200px]">
            <Image fill src={imageUrl} alt={`Image for ${productName}`} />
          </div>
          <div className="flex flex-col justify-between gap-y-4">
            <h3 className="line-clamp-1 text-lg font-medium">{productName}</h3>
            <CartActions productId={productId} />
          </div>
        </div>
        <div>{generatePriceTag(quantity * productPrice)}</div>
      </div>
      <Separator className="mb-8 mt-4" />
    </>
  );
}
