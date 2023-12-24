"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import { trpc } from "~/app/_trpc/client";
import { LoaderSpinner } from "~/components/loader-spinner";

const formSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "Please check your email for a valid OTP." })
    .max(6, { message: "Please check your email for a valid OTP." }),
});

interface IProps {
  tempUserId: string;
}

export const OTPFormInput = memo(_OTPFormInput);
function _OTPFormInput({ tempUserId }: IProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: "" },
  });

  const { mutate: handleVerifyTempUser, isLoading } =
    trpc.user.verifyTempUser.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: () => {
        toast.success(
          "Account created successfully! Please proceed to sign-in page.",
        );
        router.push("/login");
      },
    });

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      handleVerifyTempUser({ id: tempUserId, ...values });
    },
    [handleVerifyTempUser, tempUserId],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormDescription>
                IMPORTANT: OTP is case-sensitive!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="amazon"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading && <LoaderSpinner />}
          Verify email and create account
        </Button>
      </form>
    </Form>
  );
}
