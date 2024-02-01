import { notFound } from "next/navigation";
import { ProductDetails } from "./_components/product-details";
import { ProductImages } from "./_components/product-images";
import { serverClient } from "~/app/_trpc/server-client";
import { Breadcrumbs } from "~/components/breadcrumbs";

interface IProps {
  params: {
    productId: string;
  };
}

export default async function ProductIdPage({ params }: IProps) {
  const product = await serverClient.product.getProductById(params.productId);
  if (!product) return notFound();

  const breadcrumbs = [
    {
      bcLabel: "Home",
      bcHref: "/",
    },
    {
      bcLabel: product.category.name,
      bcHref: `/${product.category.slug}`,
    },
  ];

  return (
    <article className="mx-auto max-w-6xl px-4 pb-24 pt-6">
      <Breadcrumbs breadcrumbs={breadcrumbs} className="text-sm">
        {product.name}
      </Breadcrumbs>
      <h1 className="text-2xl font-medium md:hidden">{product?.name}</h1>
      <section className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
        <ProductImages data={product?.images || []} />
        <ProductDetails data={product} />
      </section>
      <section>Description and Reviews</section>
      <section>Other Products</section>
      <section>Assurance Bar</section>
    </article>
  );
}
