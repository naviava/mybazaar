import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

export const productFormSchema = z.object({
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
});

export type ProductFormSchemaType = UseFormReturn<{
  name: string;
  price: number;
  categorySlug: string;
  isAvailable: boolean;
  description?: string;
  discountPct?: number;
  stockCount?: number;
  images?: string[];
}>;
