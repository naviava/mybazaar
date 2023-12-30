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

export default async function Home() {
  const products = await serverClient.product.get5Products();

  return (
    <div className="space-y-6">
      {!!products && !!products.length && (
        <HomePageCarousel products={products} />
      )}
      <RandomCategoryGrid categories={CATEGORIES} />
    </div>
  );
}
