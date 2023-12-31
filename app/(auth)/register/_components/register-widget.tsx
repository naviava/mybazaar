"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { GoToHomepage } from "~/components/go-to-homepage";
import { LoaderSpinner } from "~/components/loader-spinner";
import { AlreadyHaveAnAccount } from "./already-have-an-account";
import { RegisterFormInput } from "./register-form-input";

import { trpc } from "~/app/_trpc/client";
import { registerFormFields } from "~/utils/form-inputs/auth/auth-form-fields";

const registerFormSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, { message: "Name is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Both passwords must be the same" }),
});

export type RegisterFormSchemaType = UseFormReturn<{
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}>;

export function RegisterWidget() {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: handleCreateTempUser, isLoading } =
    trpc.user.createTempUser.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: (tempUserId) => {
        toast.success("Verification email sent.");
        router.push(`/register/${tempUserId}`);
      },
    });

  const onSubmit = useCallback(
    (values: z.infer<typeof registerFormSchema>) => {
      handleCreateTempUser(values);
    },
    [handleCreateTempUser],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 space-y-6 rounded-md border border-neutral-300 p-4"
      >
        <h1 className="text-3xl font-semibold">Create Account</h1>
        {registerFormFields.map((field) => (
          <RegisterFormInput
            key={field.fieldName}
            form={form}
            disabled={isLoading}
            {...field}
          />
        ))}
        <Button
          type="submit"
          variant="amazon"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading && <LoaderSpinner />}
          Confirm details and Register
        </Button>
        <Separator className="my-4" />
        <AlreadyHaveAnAccount />
        <GoToHomepage />
      </form>
    </Form>
  );
}
