"use client";

import { memo } from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { ProductFormSchemaType } from "~/utils/form-inputs/products/product-form-schema";

interface IProps {
  form: ProductFormSchemaType;
  label: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  type?: "text" | "number";
  fieldName: "name" | "price" | "discountPct" | "stockCount";
}

export const ProductFormInput = memo(_ProductFormInput);
function _ProductFormInput({
  form,
  label,
  placeholder,
  description,
  fieldName,
  type = "text",
  disabled = false,
}: IProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-normal">{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              disabled={disabled}
              placeholder={placeholder ? placeholder : ""}
              className="text-base"
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
