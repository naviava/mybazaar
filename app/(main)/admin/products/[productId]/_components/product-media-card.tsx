"use client";

import { useCallback, useReducer } from "react";
import { useRouter } from "next/navigation";

import { useDropzone } from "react-dropzone";
import { useNotificationBanner } from "~/store/use-notification-banner";
import { useHandleAcceptedFiles } from "~/hooks/use-handle-accepted-files";

import { AdminFormWrapper } from "~/components/admin-form-wrapper";
import { ImageDropzone } from "~/components/image-upload-widget/image-dropzone";
import { UploadImagesButton } from "~/components/image-upload-widget/upload-images-button";

import { trpc } from "~/app/_trpc/client";
import { onFileUpload } from "~/utils/form-inputs/products/handle-file-upload";
import { handleDragDropImage } from "~/utils/form-inputs/products/handle-drag-drop-image";

import {
  initialState,
  productMediaCardReducer,
} from "~/store/product-media-card-reducer";
import {
  ERROR_MESSAGES,
  MAX_FILES,
} from "~/utils/form-inputs/products/file-validation";

interface IProps {
  productId: string;
}

export function ProductMediaCard({ productId }: IProps) {
  const router = useRouter();
  const { showBanner } = useNotificationBanner((state) => state);
  const [state, dispatch] = useReducer(productMediaCardReducer, initialState);

  const { data: product } = trpc.product.getProductById.useQuery(productId);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: () => handleDragDropImage({ acceptedFiles, showBanner }),
  });

  // Runs a useEffect to handle accepted files.
  useHandleAcceptedFiles({
    acceptedFiles,
    product,
    showBanner,
    state,
    dispatch,
  });

  const utils = trpc.useUtils();
  const { mutate: handleLinktoDB } = trpc.product.createImageUrls.useMutation({
    onError: ({ message }) => {
      dispatch({ type: "SET_PREVIEW_URLS", payload: [] });
      dispatch({ type: "SET_FILES", payload: [] });
      showBanner({
        message,
        type: "error",
      });
    },
    onSuccess: () => {
      dispatch({ type: "SET_PREVIEW_URLS", payload: [] });
      dispatch({ type: "SET_FILES", payload: [] });
      utils.product.getProductById.invalidate(productId);
      router.refresh();
      showBanner({
        message: ERROR_MESSAGES.SUCCESS_UPLOAD,
        type: "success",
      });
    },
  });

  const handleFileUpload = useCallback(
    (files: File[]) => onFileUpload({ files, productId, showBanner }),
    [showBanner, productId],
  );

  const handleClick = useCallback(async () => {
    if (!state.files?.length) {
      showBanner({
        message: ERROR_MESSAGES.NO_FILES_SELECTED,
        type: "warning",
      });
      return;
    }
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const uploadedUrls = await handleFileUpload(state.files);
      const validUrls = uploadedUrls.filter((url): url is string => !!url);
      handleLinktoDB({ productId, imageUrls: validUrls });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [state.files, productId, handleFileUpload, showBanner, handleLinktoDB]);

  return (
    <AdminFormWrapper title="Media">
      <div className="mt-6 space-y-6">
        <ImageDropzone
          previewUrls={state.previewUrls}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          disabled={state.isLoading}
          dbImages={product?.images.map((image) => image.imageUrl)}
        >
          <div className="space-y-1 text-center">
            <p>
              Drag &apos;n&apos; drop some files here, or click to select files
            </p>
            <p className="text-sm italic text-muted-foreground">
              Recommended: 800x800 px
            </p>
          </div>
        </ImageDropzone>
        {!!product &&
          product.images.length < MAX_FILES &&
          !!state.previewUrls.length && (
            <UploadImagesButton
              disabled={state.isLoading}
              handleClick={handleClick}
              setPreviewUrls={(newUrls) =>
                dispatch({ type: "SET_PREVIEW_URLS", payload: newUrls })
              }
            >
              IMPORTANT: You must upload images using this button, or they will
              not be saved once you leave this page.
            </UploadImagesButton>
          )}
      </div>
    </AdminFormWrapper>
  );
}
