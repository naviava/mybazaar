import { AdminFormWrapper } from "~/components/admin-form-wrapper";

import { ProductFormSchemaType } from "~/utils/form-inputs/products/product-form-schema";
import { ProductFormInput } from "./product-form-input";

interface IProps {
  form: ProductFormSchemaType;
}

export function ProductInfoCard({ form }: IProps) {
  const isLoading = false;

  return (
    <AdminFormWrapper title="Product Information">
      <div className="mt-4">
        <ProductFormInput
          form={form}
          label="Product Name"
          fieldName="name"
          disabled={isLoading}
        />
      </div>
    </AdminFormWrapper>
  );
}
