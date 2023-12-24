"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { useCallback } from "react";
import { Form } from "~/components/ui/form";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string(),
});
export type LoginFormSchemaType = UseFormReturn<{
  email: string;
  password: string;
}>;

export function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof loginFormSchema>) => {
    console.log(values);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}></form>
    </Form>
  );
}
