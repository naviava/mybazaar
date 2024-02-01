import { serverClient } from "~/app/_trpc/server-client";
import Preview from "~/components/rich-text-editor/preview";

interface IProps {
  data: Awaited<ReturnType<typeof serverClient.product.getProductById>>;
}

export function ProductDetails({ data }: IProps) {
  return (
    <div className="md:space-y-4">
      <div>
        <h1 className="hidden text-2xl font-medium md:block lg:text-3xl">
          {data?.name}
        </h1>
        <p className="hidden text-sm font-light md:block">SKU: {data?.sku}</p>
      </div>
      <div>{data?.description && <Preview value={data.description} />}</div>
    </div>
  );
}
