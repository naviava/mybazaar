import { ProductCard } from "./product-card";
import { serverClient } from "~/app/_trpc/server-client";

export async function ProductsGrid() {
  const products = await serverClient.product.getNProducts(8);

  return (
    <div className="grid grid-cols-2 gap-y-6 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
}
