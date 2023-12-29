import { Category, Product, ProductImage } from "@prisma/client";

type WithTimestampsAsString<T> = Omit<T, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type CategoryWithTimestampsAsString = WithTimestampsAsString<Category>;
export type ProductWithTimestampsAsString = WithTimestampsAsString<Product>;
export type ProductImageWithTimestampsAsString =
  WithTimestampsAsString<ProductImage>;

export type ProductWithCategoryAndImages = ProductWithTimestampsAsString & {
  category: CategoryWithTimestampsAsString;
  images: ProductImageWithTimestampsAsString[];
};
