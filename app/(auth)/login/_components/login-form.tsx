"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { LoaderSpinner } from "~/components/loader-spinner";
import { LoginFormInput } from "./login-form-input";

import { trpc } from "~/app/_trpc/client";
import { loginFormFields } from "~/utils/form-inputs/auth/auth-form-fields";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Please enter a password" }),
});
export type LoginFormSchemaType = UseFormReturn<{
  email: string;
  password: string;
}>;

export function LoginForm() {
  const router = useRouter();
  const utils = trpc.useUtils();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof loginFormSchema>) => {
      setIsLoading(true);
      await signIn("credentials", {
        ...values,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.ok) {
            utils.user.getAuthProfile.invalidate();
            toast.success(`Logged in. Happy shopping!`);
            router.refresh();
            router.push("/");
          } else {
            toast.error("Invalid credentials");
          }
        })
        .finally(() => setIsLoading(false));
    },
    [router, utils.user.getAuthProfile],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {loginFormFields.map((field) => (
          <LoginFormInput
            key={field.fieldName}
            form={form}
            disabled={isLoading}
            {...field}
          />
        ))}
        <Button variant="amazon" className="w-full">
          {isLoading && <LoaderSpinner />}
          Sign in
        </Button>
      </form>
    </Form>
  );
}
