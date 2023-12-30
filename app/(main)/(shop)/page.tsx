import { serverClient } from "~/app/_trpc/server-client";
import { HomePageCarousel } from "./_components/home-page-carousel";
import { db } from "~/lib/db";

export default async function Home() {
  const products = await serverClient.product.get5Products();

  return (
    <>
      {!!products && !!products.length && (
        <HomePageCarousel products={products} />
      )}
    </>
  );
}
