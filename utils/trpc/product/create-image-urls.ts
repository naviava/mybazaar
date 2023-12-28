import { revalidatePath } from "next/cache";

import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { db } from "~/lib/db";
import { adminProcedure } from "~/server/trpc";

export const createImageUrls = adminProcedure
  .input(
    z.object({
      productId: z.string(),
      imageUrls: z.array(z.string()),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    if (!ctx.user)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to perform this action",
      });
    if (ctx.user.role !== "ADMIN" && ctx.user.role !== "SUPER_ADMIN") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be an admin to perform this action",
      });
    }
    const { productId, imageUrls } = input;
    if (!productId || !imageUrls.length) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Missing required fields",
      });
    }

    await db.productImage.createMany({
      data: imageUrls.map((imageUrl) => ({
        imageUrl,
        productId,
      })),
    });

    return revalidatePath(`/admin/products/${productId}`);
  });
