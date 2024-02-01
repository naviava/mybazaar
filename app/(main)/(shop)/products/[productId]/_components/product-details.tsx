import { serverClient } from "~/app/_trpc/server-client";

interface IProps {
  data: Awaited<ReturnType<typeof serverClient.product.getProductById>>;
}

export function ProductDetails({ data }: IProps) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="hidden text-2xl font-medium md:block">{data?.name}</h1>
        <p className="text-sm font-light">SKU: {data?.sku}</p>
      </div>
      <p>{data?.description}</p>
    </div>
  );
}
