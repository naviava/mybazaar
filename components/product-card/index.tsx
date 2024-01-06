import { Category, Product, ProductImage } from "@prisma/client";
import Image from "next/image";
import { ActionsMenu } from "./actions-menu";

interface IProps {
  data: Product & {
    category: Category;
    images: ProductImage[];
  };
}

export function ProductCard({ data }: IProps) {
  return (
    <article className="space-y-5 px-2">
      <div className="relative aspect-square w-full">
        <Image
          fill
          src={
            !!data.images.length ? data.images[0].imageUrl : "/placeholder.jpg"
          }
          alt={`${data.name} Image`}
        />
        <ActionsMenu productId={data.id} isHover />
      </div>
      <div className="text-center">
        <div>Rating</div>
        <div>Name</div>
        <div>Price</div>
      </div>
    </article>
  );
}
