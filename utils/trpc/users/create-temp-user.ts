import { z } from "zod";
import { hash } from "bcrypt";

import { db } from "~/lib/db";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "~/server/trpc";
import { generateOTP } from "~/utils/registration/generate-otp";
import { sendVerificationEmail } from "~/utils/registration/send-verification-email";

export const createTempUser = publicProcedure
  .input(
    z.object({
      name: z.string().min(1, { message: "Name is required" }),
      email: z.string().email({ message: "Invalid email" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
      confirmPassword: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const { name, email, password, confirmPassword } = input;
    const otp = generateOTP();

    const existingTempUser = await db.tempUser.findUnique({
      where: { email },
    });
    if (!!existingTempUser) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message:
          "Email already exists. If you have not signed in previously, please check your email for a verification link.",
      });
    }
    if (password !== confirmPassword) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Passwords do not match",
      });
    }

    const hashedPassword = await hash(password, 10);
    const tempUser = await db.tempUser.create({
      data: {
        name,
        email,
        hashedPassword,
        otp,
      },
    });
    const response = await sendVerificationEmail({
      emailAddress: email,
      otp,
      tempUserId: tempUser.id,
    });
    if (!!response.error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to send verification email. Try again later.",
      });
    }
    return tempUser.id;
  });
