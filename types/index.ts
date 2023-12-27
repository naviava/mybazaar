import { Category, Product, ProductImage } from "@prisma/client";

export type ProductWithCategoryAndImages = Product & {
  category: Category;
  images: ProductImage[];
};
