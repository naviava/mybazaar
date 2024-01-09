import { serverClient } from "~/app/_trpc/server-client";
import { ProductImages } from "./_components/product-images";

interface IProps {
  params: {
    productId: string;
  };
}

export default async function ProductIdPage({ params }: IProps) {
  const product = await serverClient.product.getProductById(params.productId);

  return (
    <article className="mx-auto max-w-6xl px-4 pb-24 pt-6">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ProductImages data={product?.images || []} />
        <div>ProductDetails</div>
      </section>
      <section>Description and Reviews</section>
      <section>Other Products</section>
      <section>Assurance Bar</section>
    </article>
  );
}
