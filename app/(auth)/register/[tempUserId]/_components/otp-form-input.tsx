"use client";

import { memo } from "react";
import * as z from "zod";
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: "" },
  });

  //   const {} = trpc.user

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ ...values, id: tempUserId });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                IMPORTANT: OTP is case-sensitive!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="amazon" className="w-full">
          Verify email and create account
        </Button>
      </form>
    </Form>
  );
}
