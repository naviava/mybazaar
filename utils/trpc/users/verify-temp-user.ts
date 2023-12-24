import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "~/lib/db";
import { publicProcedure } from "~/server/trpc";

export const verifyTempUser = publicProcedure
  .input(
    z.object({
      otp: z
        .string()
        .min(6, { message: "Please check your email for a valid OTP." })
        .max(6, { message: "Please check your email for a valid OTP." }),
      id: z.string().min(1, { message: "User ID is required" }),
    }),
  )
  .mutation(async ({ input }) => {
    const { id, otp } = input;
    const tempUser = await db.tempUser.findUnique({
      where: { id },
    });
    if (!tempUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
    if (tempUser.otp !== otp) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid OTP",
      });
    }

    const newUser = await db.user.create({
      data: {
        name: tempUser.name,
        email: tempUser.email,
        hashedPassword: tempUser.hashedPassword,
      },
    });
    if (!newUser) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong. Try again later.",
      });
    }
    await db.tempUser.delete({
      where: { id },
    });
    return true;
  });
