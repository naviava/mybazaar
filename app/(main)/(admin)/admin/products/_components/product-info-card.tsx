import { AdminFormWrapper } from "~/components/admin-form-wrapper";

import { ProductFormSchemaType } from "~/utils/form-inputs/products/product-form-schema";

interface IProps {
  form: ProductFormSchemaType;
}

export function ProductInfoCard({ form }: IProps) {
  return (
    <AdminFormWrapper title="Product Information">
      <div className="mt-4"></div>
    </AdminFormWrapper>
  );
}
