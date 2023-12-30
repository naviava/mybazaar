import { ElementRef, memo, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { CarouselItem } from "~/components/ui/carousel";
import { Card, CardContent } from "~/components/ui/card";

interface IProps {
  index: number;
  productId: string;
  productName: string;
  imageUrl: string;
}

export const ProductCarouselItem = memo(_ProductCarouselItem);
function _ProductCarouselItem({
  index,
  productId,
  productName,
  imageUrl,
}: IProps) {
  const frameRef = useRef<ElementRef<"div">>(null);
  const [frameWidth, setFrameWidth] = useState<number>(
    frameRef.current?.clientWidth || 0,
  );
  const [frameHeight, setFrameHeight] = useState<number>(
    frameRef.current?.clientHeight || 0,
  );

  useEffect(() => {
    if (!frameRef.current) {
      return;
    }
    setFrameWidth(frameRef.current.clientWidth);
    setFrameHeight(frameRef.current.clientHeight);
  }, []);

  console.log(imageUrl);

  return (
    <CarouselItem key={index} className="pl-1 md:basis-1/2 2xl:basis-1/3">
      <div>
        <Card className="rounded-none">
          <CardContent className="relative flex aspect-square items-center justify-center">
            <Image
              fill
              src={imageUrl}
              alt={`Preview image of ${productName}`}
              width={frameWidth}
              height={frameHeight}
            />
            <span className="text-4xl font-semibold uppercase lg:text-5xl">
              {productName}
            </span>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
