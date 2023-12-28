import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "~/lib/db";
import { deleteS3Object } from "~/lib/s3-client";
import { adminProcedure } from "~/server/trpc";

export const deleteImage = adminProcedure
  .input(
    z.object({
      url: z.string(),
      imageKey: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to delete an image",
      });
    }

    const { url, imageKey } = input;
    if (!url) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "You must provide a url to delete an image",
      });
    }
    if (!imageKey) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "You must provide an imageKey to delete an image",
      });
    }

    const deletedImage = await db.productImage.deleteMany({
      where: { imageUrl: url },
    });
    if (!deletedImage) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Image not found",
      });
    }
    await deleteS3Object(imageKey);
  });
