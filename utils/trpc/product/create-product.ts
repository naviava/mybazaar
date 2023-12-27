import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "~/lib/db";
import { adminProcedure } from "~/server/trpc";
import { generateSku } from "~/utils/generate-sku";

export const createProduct = adminProcedure
  .input(
    z.object({
      name: z
        .string()
        .min(1, { message: "Product name is required" })
        .max(255, { message: "Product name is too long" }),
      price: z.coerce
        .number()
        .min(0.01, { message: "Price must be greater than 0" }),
      categorySlug: z.string(),
      description: z.string().optional(),
      discountPct: z.coerce.number().optional(),
      stockCount: z.coerce.number().optional(),
      isAvailable: z.boolean(),
      images: z.array(z.string()).optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    if (
      !ctx.user ||
      (ctx.user.role !== "ADMIN" && ctx.user.role !== "SUPER_ADMIN")
    )
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Unauthorized action",
      });

    const {
      name,
      price,
      categorySlug,
      description,
      discountPct,
      stockCount,
      isAvailable,
      images,
    } = input;

    const categoryExists = await db.category.findFirst({
      where: { slug: categorySlug },
    });
    if (!name || !price)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid input",
      });
    if (!categorySlug)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Category is required",
      });
    if (!categoryExists)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Category does not exist",
      });

    const newSKU = await generateSku();
    const newProduct = await db.product.create({
      data: {
        name,
        sku: newSKU,
        price,
        categorySlug,
        description: description || "",
        discountPct: discountPct || 0,
        stockCount: stockCount || 0,
        isAvailable,
        images: !!images?.length
          ? {
              createMany: {
                data: images?.map((image) => ({ imageUrl: image })),
              },
            }
          : undefined,
      },
      include: {
        category: true,
        images: true,
      },
    });
    return newProduct;
  });
