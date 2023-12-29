"use client";

import { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import Editor from "~/components/rich-text-editor/editor";

import { ProductFormSchemaType } from "~/utils/form-inputs/products/product-form-schema";
import Preview from "~/components/rich-text-editor/preview";
import { Edit, X } from "lucide-react";
import { Button } from "~/components/ui/button";

interface IProps {
  form: ProductFormSchemaType;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  fieldName: "description";
}

export function ProductFormRichText({
  form,
  fieldName,
  label,
  placeholder,
  disabled = false,
}: IProps) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    if (isEditing) {
      form.resetField(fieldName);
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel className="text-base font-normal">{label}</FormLabel>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleEditing}
            >
              {isEditing ? (
                <>
                  Close without saving
                  <X className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Edit
                  <Edit className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
          <FormControl>
            <div className="min-h-[90px]">
              {isEditing ? (
                <Editor
                  value={field.value || ""}
                  placeholder={placeholder}
                  disabled={disabled}
                  onChange={(value) => field.onChange(value)}
                />
              ) : (
                <Preview value={field.value || ""} />
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
