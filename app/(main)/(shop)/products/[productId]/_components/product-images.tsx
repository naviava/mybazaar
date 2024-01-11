"use client";

import { ProductImage } from "@prisma/client";
import Image from "next/image";
import { useMemo, useState } from "react";

interface IProps {
  data: ProductImage[];
}

export function ProductImages({ data }: IProps) {
  const hasImages = useMemo(() => data.length > 0, [data]);
  const [currentImage, setCurrentImage] = useState(
    hasImages ? data[0].imageUrl : "/placeholder.jpg",
  );

  return (
    <div className="flex flex-col gap-x-2 gap-y-4 lg:flex-row">
      <div className="relative order-1 h-[400px] w-full lg:order-2">
        <Image
          fill
          src={currentImage}
          alt="Product Image"
          className="object-cover"
        />
      </div>
      {/* {hasImages && ( */}
      <div className="order-2 grid grid-cols-4 gap-2 lg:order-1 lg:grid-cols-1">
        {Array.from({ length: 4 }, (_, idx) => (
          <ImageThumbnail
            key={idx}
            onClick={() => setCurrentImage(data[idx].imageUrl)}
          />
        ))}
      </div>
      {/* )} */}
    </div>
  );
}

interface IThumbnailProps {
  onClick?: () => void;
}

function ImageThumbnail({ onClick }: IThumbnailProps) {
  return (
    <div
      role="button"
      onClick={onClick}
      className="relative aspect-square w-full lg:w-[70px]"
    >
      <Image
        fill
        src="/placeholder.jpg"
        alt="Product Image"
        className="object-cover"
      />
    </div>
  );
}
