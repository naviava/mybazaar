import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Product name is required" })
    .max(255, { message: "Product name is too long" }),
  price: z.number().min(0.01, { message: "Price must be greater than 0" }),
  categorySlug: z.string(),
  description: z.string().optional(),
  discountPct: z.number().optional(),
  stockCount: z.number().optional(),
  isAvailable: z.boolean().optional(),
  images: z.array(z.string()).optional(),
});

export type ProductFormSchemaType = UseFormReturn<{
  name: string;
  price: number;
  categorySlug: string;
  description?: string;
  discountPct?: number;
  stockCount?: number;
  isAvailable?: boolean;
  images?: string[];
}>;
