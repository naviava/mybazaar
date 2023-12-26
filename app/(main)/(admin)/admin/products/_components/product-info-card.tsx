import { AdminFormWrapper } from "~/components/admin-form-wrapper";
import { ProductFormInput } from "./product-form-input";
import { DisabledInput } from "./disabled-input";

import { ProductFormSchemaType } from "~/utils/form-inputs/products/product-form-schema";

interface IProps {
  form: ProductFormSchemaType;
}

export function ProductInfoCard({ form }: IProps) {
  const isLoading = false;

  return (
    <AdminFormWrapper title="Product Information">
      <div className="mt-6 space-y-6">
        <ProductFormInput
          form={form}
          label="Name"
          fieldName="name"
          disabled={isLoading}
        />
        <div className="space-y-6 md:flex md:gap-x-6 md:space-y-0">
          <div className="flex-1">
            <DisabledInput label="SKU" placeholder="Not yet generated" />
          </div>
          <div className="flex-1">Category Combobox</div>
        </div>
        <div className="space-y-6 md:flex md:gap-x-6 md:space-y-0">
          <div className="flex-1">
            <ProductFormInput
              form={form}
              type="number"
              fieldName="stockCount"
              label="Stock Count"
              disabled={isLoading}
            />
          </div>
          <div className="flex-1">
            <ProductFormInput
              form={form}
              type="number"
              fieldName="discountPct"
              label="Discount %"
              disabled={isLoading}
            />
          </div>
        </div>
        <div>Rich Text Editor</div>
      </div>
    </AdminFormWrapper>
  );
}
