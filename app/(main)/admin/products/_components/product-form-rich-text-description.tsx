"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";

import { ProductFormSchemaType } from "~/utils/form-inputs/products/product-form-schema";

const MODULES = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
const FORMATS = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
];

interface IProps {
  form: ProductFormSchemaType;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  fieldName: "description";
}

export function ProductFormRichTextDescription({
  form,
  fieldName,
  label,
  placeholder,
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
            <ReactQuill
              {...field}
              theme="snow"
              modules={MODULES}
              formats={FORMATS}
              readOnly={disabled}
              placeholder={placeholder}
              className="max-h-[30rem] overflow-auto"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
