"use client";

import { memo } from "react";

import { Separator } from "~/components/ui/separator";
import { AdminFormWrapper } from "~/components/admin-form-wrapper";
import { ProductFormInput } from "./product-form-input";

import { ProductFormSchemaType } from "~/utils/form-inputs/products/product-form-schema";
import { ProductFormSwitch } from "./product-form-switch";

interface IProps {
  form: ProductFormSchemaType;
}

export const PriceCard = memo(_PriceCard);
function _PriceCard({ form }: IProps) {
  return (
    <AdminFormWrapper title="Pricing and Availability">
      <div className="mt-6 space-y-6">
        <ProductFormInput
          form={form}
          type="number"
          fieldName="price"
          label="Price"
        />
        <Separator className="my-3" />
        <ProductFormSwitch
          form={form}
          fieldName="isAvailable"
          label="Availability"
        />
      </div>
    </AdminFormWrapper>
  );
}
