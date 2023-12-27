import { router } from "~/server/trpc";
import { createProduct } from "~/utils/trpc/product/create-product";

export const productRouter = router({
  createProduct,
});
