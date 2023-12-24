"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { ChevronRight, Loader } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { RegisterFormInput } from "./register-form-input";

import { trpc } from "~/app/_trpc/client";
import { GoToHomepage } from "~/components/go-to-homepage";

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
        <RegisterFormInput
          form={form}
          fieldName="name"
          label="Your name"
          placeholder="First and last name"
          disabled={isLoading}
        />
        <RegisterFormInput
          form={form}
          fieldName="email"
          label="Email address"
          disabled={isLoading}
        />
        <RegisterFormInput
          form={form}
          type="password"
          fieldName="password"
          label="Password"
          description="Password must be at least 6 characters."
          disabled={isLoading}
        />
        <RegisterFormInput
          form={form}
          type="password"
          fieldName="confirmPassword"
          label="Confirm password"
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="amazon"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Confirm details and Register
        </Button>
        <Separator className="my-4" />
        <div className="flex items-center gap-x-2">
          <p>Already have an account?</p>
          <Link href="/login" className="flex items-center text-blue-700">
            <span>Sign in</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <GoToHomepage />
      </form>
    </Form>
  );
}
