import { router } from "~/server/trpc";

import { deleteImage } from "~/utils/trpc/product/delete-image";
import { createProduct } from "~/utils/trpc/product/create-product";
import { updateProduct } from "~/utils/trpc/product/update-product";
import { getProductById } from "~/utils/trpc/product/get-product-by-id";
import { createImageUrls } from "~/utils/trpc/product/create-image-urls";

export const productRouter = router({
  createProduct,
  updateProduct,
  createImageUrls,
  deleteImage,
  getProductById,
});
