import { PageHeading } from "~/components/page-heading";
import { AdminPageWrapper } from "~/components/admin-page-wrapper";
import { EditProductForm } from "./_components/edit-product-form";
import { serverClient } from "~/app/_trpc/server-client";
import { redirect } from "next/navigation";

const BREADCRUMBS = [
  {
    bcLabel: "Products",
    bcHref: "/admin/products",
  },
];

interface IProps {
  params: {
    productId: string;
  };
}

export default async function ProductIdPage({ params }: IProps) {
  const { productId } = params;
  const product = await serverClient.product.getProductById(productId);
  if (!product) return redirect("/admin/products/add-product");

  return (
    <AdminPageWrapper>
      <PageHeading
        label={product.name}
        currentBcLabel={product.name}
        breadcrumbs={BREADCRUMBS}
      />
      <EditProductForm productId={productId} initialData={product} />
    </AdminPageWrapper>
  );
}
