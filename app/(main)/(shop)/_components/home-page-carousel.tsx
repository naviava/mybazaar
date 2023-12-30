"use client";

import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { ProductCarouselItem } from "./product-carousel-item";

import { serverClient } from "~/app/_trpc/server-client";

interface IProps {
  products: Awaited<ReturnType<typeof serverClient.product.get5Products>>;
}

export function HomePageCarousel({ products }: IProps) {
  const [api, setApi] = useState<CarouselApi>(null);

  useEffect(() => {
    if (!api) {
      return;
    }
    console.log(api.root);
  }, [api]);

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        setApi={setApi}
        className="mx-auto h-full w-full"
      >
        <CarouselContent className="-ml-1">
          {products.map((product, idx) => (
            <ProductCarouselItem
              key={product.id}
              index={idx}
              productId={product.id}
              productName={product.name}
              imageUrl={
                !!product.images.length ? product.images[0].imageUrl : "" // TODO: Placeholder image to go here.
              }
            />
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 md:left-4 xl:left-6" />
        <CarouselNext className="right-2 md:right-4 xl:right-6" />
      </Carousel>
    </div>
  );
}
