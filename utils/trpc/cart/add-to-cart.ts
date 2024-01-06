import { z } from "zod";
import { privateProcedure } from "~/server/trpc";

export const addToCart = privateProcedure
  .input(
    z.object({
      productId: z.string(),
      quantity: z.optional(z.number()),
    }),
  )
  .mutation(() => {});
