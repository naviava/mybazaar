"use client";

import { memo } from "react";
import { LoginFormSchemaType } from "./login-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

interface IProps {
  form: LoginFormSchemaType;
  fieldName: "email" | "password";
  label: string;
  type?: "text" | "password";
  disabled?: boolean;
}

export const LoginFormInput = memo(_LoginFormInput);
function _LoginFormInput({
  form,
  fieldName,
  label,
  type = "text",
  disabled = false,
}: IProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} disabled={disabled} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
