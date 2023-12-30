import { db } from "~/lib/db";
import HomePageCarousel from "./_components/home-page-carousel";

export default async function Home() {
  const product = await db.product.findFirst({
    include: {
      category: true,
      images: true,
    },
  });

  return (
    <div className="mx-auto w-full">
      <HomePageCarousel />
    </div>
  );
}
