import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "~/lib/db";
import { publicProcedure } from "~/server/trpc";

export const getTempUser = publicProcedure
  .input(z.string())
  .query(async ({ input }) => {
    const tempUserId = input;
    const tempUser = await db.tempUser.findUnique({
      where: { id: tempUserId },
    });
    if (!tempUser) return null;

    const { hashedPassword, otp, ...rest } = tempUser;
    return rest;
  });
