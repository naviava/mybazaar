import Image from "next/image";
import { Category, Product, ProductImage } from "@prisma/client";
import { ActionsMenu } from "./actions-menu";
import { generatePriceTag } from "~/utils";

interface IProps {
  data: Product & {
    category: Category;
    images: ProductImage[];
  };
}

export function ProductCard({ data }: IProps) {
  return (
    <article className="group/card cursor-pointer px-2 transition-all">
      <div className="relative mb-5 aspect-square w-full transition-all">
        <Image
          fill
          src={
            !!data.images.length ? data.images[0].imageUrl : "/placeholder.jpg"
          }
          alt={`${data.name} Image`}
          className="object-cover"
        />
        <ActionsMenu productId={data.id} isHover />
      </div>
      <div className="mb-1 text-center">
        <div>Rating</div>
        <h4 className="line-clamp-1 font-medium">{data.name}</h4>
        <p className="text-lg font-medium text-blue-700">
          {generatePriceTag(data.price)}
        </p>
      </div>
      <ActionsMenu productId={data.id} isStatic />
    </article>
  );
}
