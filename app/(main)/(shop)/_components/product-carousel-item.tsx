import { memo, useMemo } from "react";
import Image from "next/image";

import { CarouselItem } from "~/components/ui/carousel";
import { Card, CardContent } from "~/components/ui/card";
import { CarouselCTA } from "./carousel-cta";

interface IProps {
  index: number;
  centerIndex: number | undefined;
  productId: string;
  productName: string;
  imageUrl: string;
}

export const ProductCarouselItem = memo(_ProductCarouselItem);
function _ProductCarouselItem({
  index,
  centerIndex,
  productId,
  productName,
  imageUrl,
}: IProps) {
  const isVisible = useMemo(() => centerIndex === index, [centerIndex, index]);

  return (
    <CarouselItem key={index} className="pl-1 md:basis-1/2 2xl:basis-1/3">
      <Card className="rounded-none">
        <CardContent className="relative flex aspect-square items-center justify-center">
          <Image
            fill
            src={imageUrl}
            alt={`Preview image of ${productName}`}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
          {isVisible && (
            <CarouselCTA productId={productId} productName={productName} />
          )}
        </CardContent>
      </Card>
    </CarouselItem>
  );
}
