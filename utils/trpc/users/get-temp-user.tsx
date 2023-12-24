import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "~/lib/db";
import { publicProcedure } from "~/server/trpc";

export const getTempUser = publicProcedure
  .input(z.string().cuid())
  .query(async ({ input }) => {
    const tempUserId = input;
    const tempUser = await db.tempUser.findUnique({
      where: { id: tempUserId },
    });
    if (!tempUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const { hashedPassword, ...rest } = tempUser;
    return rest;
  });
