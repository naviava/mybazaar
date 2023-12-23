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
import { RegisterFormSchemaType } from "./register-widget";

interface Props {
  form: RegisterFormSchemaType;
  fieldName: "name" | "email" | "password" | "confirmPassword";
  label?: string;
  placeholder?: string;
  description?: string;
  type?: "text" | "password";
}

export const RegisterFormInput = memo(_RegisterFormInput);
function _RegisterFormInput({
  form,
  fieldName,
  label,
  placeholder,
  description,
  type = "text",
}: Props) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-base font-semibold">{label}</FormLabel>
          )}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder ? placeholder : ""}
              {...field}
              className="border-neutral-400 text-base"
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
