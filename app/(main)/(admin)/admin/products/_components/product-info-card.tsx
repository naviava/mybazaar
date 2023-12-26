"use client";

import { AdminFormWrapper } from "~/components/admin-form-wrapper";
import { ProductFormInput } from "./product-form-input";
import { DisabledInput } from "./disabled-input";

import { ProductFormSchemaType } from "~/utils/form-inputs/products/product-form-schema";
import { memo, useEffect } from "react";

interface IProps {
  form: ProductFormSchemaType;
}

export const ProductInfoCard = memo(_ProductInfoCard);
function _ProductInfoCard({ form }: IProps) {
  // TODO: Replace with real data.
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
          {/* TODO: Add category combobox. */}
          <div className="flex-1">Category Combobox</div>
        </div>
        <div className="space-y-6 md:flex md:gap-x-6 md:space-y-0">
          <div className="flex-1">
            <ProductFormInput
              form={form}
              type="number"
              min={0}
              step={1}
              fieldName="stockCount"
              label="Stock Count"
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>
        </div>
        {/* TODO: Add rich text editor for description. */}
        <div>Rich Text Editor</div>
      </div>
    </AdminFormWrapper>
  );
}
