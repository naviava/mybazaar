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

interface IProps {
  form: RegisterFormSchemaType;
  fieldName: "name" | "email" | "password" | "confirmPassword";
  label?: string;
  placeholder?: string;
  description?: string;
  type?: "text" | "password";
  disabled?: boolean;
}

export const RegisterFormInput = memo(_RegisterFormInput);
function _RegisterFormInput({
  form,
  fieldName,
  label,
  placeholder,
  description,
  type = "text",
  disabled = false,
}: IProps) {
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
              {...field}
              disabled={disabled}
              placeholder={placeholder ? placeholder : ""}
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
