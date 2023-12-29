import { Dispatch, useEffect } from "react";

import { ProductWithCategoryAndImages } from "~/types";
import { BannerType } from "~/store/use-notification-banner";

import {
  ProductMediaState,
  ProdutMediaAction,
} from "~/store/product-media-card-reducer";

import {
  APPROVED_TYPES,
  ERROR_MESSAGES,
  MAX_FILES,
} from "~/utils/form-inputs/products/file-validation";

interface UseHandleAcceptedFilesProps {
  acceptedFiles: File[];
  state: ProductMediaState; // replace with the actual type
  product: ProductWithCategoryAndImages | undefined;
  dispatch: Dispatch<ProdutMediaAction>;
  showBanner: ({
    message,
    type,
  }: {
    message: string;
    type: BannerType;
  }) => void;
}

export function useHandleAcceptedFiles({
  acceptedFiles,
  product,
  showBanner,
  state,
  dispatch,
}: UseHandleAcceptedFilesProps) {
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
}
