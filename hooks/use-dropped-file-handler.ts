import { useEffect, useReducer } from "react";
import { ProductWithCategoryAndImages } from "~/types";

import {
  initialState,
  productMediaCardReducer,
} from "~/store/product-media-card-reducer";
import { BannerType } from "~/store/use-notification-banner";
import {
  APPROVED_TYPES,
  ERROR_MESSAGES,
  MAX_FILES,
} from "~/app/(main)/admin/products/[productId]/_components/product-media-card";

type TProps = {
  acceptedFiles: File[];
  product: ProductWithCategoryAndImages | undefined;
  showBanner: ({
    message,
    type,
  }: {
    message: string;
    type: BannerType;
  }) => void;
};

export function useDroppedFileHandler({
  acceptedFiles,
  product,
  showBanner,
}: TProps) {
  const [state, dispatch] = useReducer(productMediaCardReducer, initialState);

  useEffect(() => {
    acceptedFiles.forEach((file) => {
      if (!APPROVED_TYPES.includes(file.type)) {
        showBanner({
          message: ERROR_MESSAGES.INVALID_FILE_TYPE,
          type: "warning",
        });
        return;
      }
    });
    const approvedFiles = acceptedFiles.filter((file) =>
      APPROVED_TYPES.includes(file.type),
    );
    if (approvedFiles.length > MAX_FILES) {
      showBanner({
        message: ERROR_MESSAGES.MAX_IMAGES,
        type: "warning",
      });
      return;
    }
    const existingImagesCount = product?.images.length || 0;
    if (
      approvedFiles.length + existingImagesCount + state.previewUrls.length >
      MAX_FILES
    ) {
      showBanner({
        message: ERROR_MESSAGES.MAX_IMAGES,
        type: "warning",
      });
      return;
    }
    dispatch({ type: "APPEND_FILES", payload: approvedFiles });
    if (state.previewUrls.length > 0) {
      state.previewUrls.forEach((url) => URL.revokeObjectURL(url));
    }
    const updatedPreviewUrls = approvedFiles
      .map((file) => {
        if (!APPROVED_TYPES.includes(file.type)) {
          return;
        } else {
          return URL.createObjectURL(file);
        }
      })
      .filter((url): url is string => Boolean(url));
    dispatch({ type: "APPEND_PREVIEW_URLS", payload: updatedPreviewUrls });
    /**
     * previewUrls is deliberately excluded from the dependency
     * array, as it will cause an infinite loop.
     */
  }, [acceptedFiles, product, showBanner]);

  return [state, dispatch];
}
