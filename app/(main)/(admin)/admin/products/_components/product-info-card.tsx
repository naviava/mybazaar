"use client";

import { memo } from "react";
import { useParams } from "next/navigation";

import { CategoryCombobox } from "~/components/category-combobox";
import { AdminFormWrapper } from "~/components/admin-form-wrapper";
import { ProductFormInput } from "./product-form-input";
import { DisabledInput } from "./disabled-input";

import { trpc } from "~/app/_trpc/client";
import { ProductFormSchemaType } from "~/utils/form-inputs/products/product-form-schema";

interface IProps {
  form: ProductFormSchemaType;
  disabled?: boolean;
}

export const ProductInfoCard = memo(_ProductInfoCard);
function _ProductInfoCard({ form, disabled = false }: IProps) {
  const params = useParams<{ productId: string }>();
  const { data: product } = trpc.product.getProductById.useQuery(
    params.productId,
  );

  return (
    <AdminFormWrapper title="Product Information">
      <div className="mt-6 space-y-6">
        <ProductFormInput
          form={form}
          label="Name"
          fieldName="name"
          disabled={disabled}
        />
        <div className="gap-x-6 space-y-6 md:flex md:space-y-0">
          <div className="flex-1">
            <DisabledInput
              label="SKU"
              fieldId="sku"
              value={product?.sku || ""}
              placeholder="Not yet generated"
            />
          </div>
          {/* TODO: Add category combobox. */}
          <div className="flex-1">
            <CategoryCombobox form={form} />
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="flex-1">
            <ProductFormInput
              form={form}
              type="number"
              min={0}
              step={1}
              fieldName="stockCount"
              label="Stock Count"
              disabled={disabled}
            />
          </div>
          <div className="flex-1">
            <ProductFormInput
              form={form}
              type="number"
              min={0}
              max={99}
              step={0.1}
              fieldName="discountPct"
              label="Discount %"
              disabled={disabled}
            />
          </div>
        </div>
        {/* TODO: Add rich text editor for description. */}
        <div>Rich Text Editor</div>
      </div>
    </AdminFormWrapper>
  );
}
