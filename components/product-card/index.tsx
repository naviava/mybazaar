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
    <article className="group/card px-2 transition-all">
      <div className="relative mb-5 aspect-square w-full transition-all">
        <Image
          fill
          src={
            !!data.images.length ? data.images[0].imageUrl : "/placeholder.jpg"
          }
          alt={`${data.name} Image`}
        />
        <ActionsMenu productId={data.id} isHover />
      </div>
      <div className="mb-1 text-center">
        <div>Rating</div>
        <div>Name</div>
        <div>Price</div>
      </div>
      <ActionsMenu productId={data.id} isStatic />
    </article>
  );
}
