"use client";

import { useMemo } from "react";
import Image from "next/image";

import { ProductImageWithTimestampsAsString } from "~/types";
import { useCart } from "~/hooks/use-cart";

import { Separator } from "~/components/ui/separator";
import { CartActions } from "./cart-actions";

import { generatePriceTag } from "~/utils";

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
  const { totalPrice, totalQuantity } = useCart({});
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
            <div>
              <h3 className="line-clamp-1 text-lg font-medium">
                {productName}
                <span className="ml-2 text-sm font-light text-muted-foreground">
                  x 1
                </span>
              </h3>
              <p className="text-sm text-muted-foreground">{productCategory}</p>
            </div>
            <CartActions productId={productId} />
          </div>
        </div>
        <div className="text-lg font-semibold">
          {generatePriceTag(quantity * productPrice)}
        </div>
      </div>
      <Separator className="mb-8 mt-4" />
    </>
  );
}
