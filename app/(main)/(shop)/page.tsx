import { Separator } from "~/components/ui/separator";
import { TopSellingProducts } from "./_components/top-selling-products";
import { RandomCategoryGrid } from "./_components/random-category-grid";
import { HomePageCarousel } from "./_components/home-page-carousel";

import { serverClient } from "~/app/_trpc/server-client";

export const CATEGORIES = [
  {
    name: "Shoes",
    image: "/shoes.jpg",
    href: "#",
  },
  {
    name: "Phones",
    image: "/phones.jpg",
    href: "#",
  },
  {
    name: "Grocery",
    image: "/grocery.jpg",
    href: "#",
  },
  {
    name: "Sunglasses",
    image: "/sunglasses.jpg",
    href: "#",
  },
];

export default async function HomePage() {
  const products = await serverClient.product.getNProducts(5);

  return (
    <div className="space-y-6 pb-24">
      {!!products && !!products.length && (
        <HomePageCarousel products={products} />
      )}
      <RandomCategoryGrid categories={CATEGORIES} />
      <Separator className="my-8 bg-neutral-300" />
      <TopSellingProducts />
    </div>
  );
}
