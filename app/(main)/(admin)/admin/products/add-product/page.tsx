import { PageHeading } from "~/components/page-heading";
import { AdminPageWrapper } from "~/components/admin-page-wrapper";

export default function AddProductPage() {
  const breadcrumbs = {
    rootLabel: "Products",
    rootHref: "/admin/products",
    currentPageLabel: "Add Product",
  };

  return (
    <AdminPageWrapper>
      <PageHeading label="Add Product" breadcrumbs={breadcrumbs} />
    </AdminPageWrapper>
  );
}
