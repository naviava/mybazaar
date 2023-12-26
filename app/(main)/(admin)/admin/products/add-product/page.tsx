import { PageHeading } from "~/components/page-heading";
import { AdminPageWrapper } from "~/components/admin-page-wrapper";
import { NewProductForm } from "../_components/new-product-form";
import { Suspense } from "react";

const BREADCRUMBS = [
  {
    bcLabel: "Products",
    bcHref: "/admin/products",
  },
];

export default function AddProductPage() {
  return (
    <AdminPageWrapper>
      <PageHeading
        label="Add Product"
        currentBcLabel="Add Product"
        breadcrumbs={BREADCRUMBS}
      />
      <NewProductForm />
    </AdminPageWrapper>
  );
}
