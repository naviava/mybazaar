"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "~/components/ui/carousel";
import { ProductCarouselItem } from "./product-carousel-item";
import { serverClient } from "~/app/_trpc/server-client";

interface IProps {
  products: Awaited<ReturnType<typeof serverClient.product.get5Products>>;
}

export const HomePageCarousel = memo(_HomePageCarousel);
function _HomePageCarousel({ products }: IProps) {
  const hasSetApi = useRef(false);
  const [api, setApi] = useState<CarouselApi>(null);
  const [centerIndex, setCenterIndex] = useState<number>(0);

  const handleSetApi = useCallback((api: CarouselApi) => {
    if (hasSetApi.current) {
      return;
    }
    hasSetApi.current = true;
    setApi(api);
  }, []);

  useEffect(() => {
    if (!api) return;
    const onScroll = () => {
      setCenterIndex(api.selectedScrollSnap());
    };
    api.on("scroll", onScroll);
    return () => {
      api.off("scroll", onScroll);
    };
  }, [api]);

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[Autoplay({ delay: 5000 })]}
        setApi={handleSetApi}
        className="mx-auto h-full w-full"
      >
        <CarouselContent className="-ml-1">
          {products.map((product, idx) => (
            <ProductCarouselItem
              key={product.id}
              index={idx}
              centerIndex={centerIndex}
              productId={product.id}
              productName={product.name}
              imageUrl={
                !!product.images.length ? product.images[0].imageUrl : "" // TODO: Placeholder image to go here.
              }
            />
          ))}
        </CarouselContent>
        <CarouselPrevious
          variant="ghost"
          className="left-2 text-white hover:bg-white/20 hover:text-white md:left-4 xl:left-6"
        />
        <CarouselNext
          variant="ghost"
          className="right-2 text-white hover:bg-white/20 hover:text-white md:right-4 xl:right-6"
        />
      </Carousel>
    </div>
  );
}
