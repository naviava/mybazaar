import { router } from "~/server/trpc";

import { deleteImage } from "~/utils/trpc/product/delete-image";
import { createProduct } from "~/utils/trpc/product/create-product";
import { updateProduct } from "~/utils/trpc/product/update-product";
import { getProductById } from "~/utils/trpc/product/get-product-by-id";
import { createImageUrls } from "~/utils/trpc/product/create-image-urls";
import { getNProducts } from "~/utils/trpc/product/get-n-products";

export const productRouter = router({
  createProduct,
  updateProduct,
  createImageUrls,
  deleteImage,
  getProductById,
  getNProducts, //TODO: Delete this route handler.
});
