import { router } from "~/server/trpc";

import { createProduct } from "~/utils/trpc/product/create-product";
import { getProductById } from "~/utils/trpc/product/get-product-by-id";

export const productRouter = router({
  createProduct,
  getProductById,
});
