"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useDropzone } from "react-dropzone";
import { useNotificationBanner } from "~/store/use-notification-banner";

import { AdminFormWrapper } from "~/components/admin-form-wrapper";
import { ImageDropzone } from "~/components/image-upload-widget/image-dropzone";
import { UploadImagesButton } from "~/components/image-upload-widget/upload-images-button";

import { trpc } from "~/app/_trpc/client";
import { onFileUpload } from "~/utils/form-inputs/products/handle-file-upload";
import { handleDragDropImage } from "~/utils/form-inputs/products/handle-drag-drop-image";

const MAX_FILES = 4;
export const APPROVED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const ERROR_MESSAGES = {
  INVALID_FILE_TYPE: "Invalid file type. Please upload an image.",
  MAX_IMAGES: `You can only have ${MAX_FILES} images per product.`,
  NO_FILES_SELECTED: "No files selected.",
  SUCCESS_UPLOAD: "Successfully uploaded images.",
};

interface IProps {
  productId: string;
}

export function ProductMediaCard({ productId }: IProps) {
  const router = useRouter();
  const { showBanner } = useNotificationBanner((state) => state);

  const [files, setFiles] = useState<File[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { data: product } = trpc.product.getProductById.useQuery(productId);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: () => handleDragDropImage({ acceptedFiles, showBanner }),
  });

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
      approvedFiles.length + existingImagesCount + previewUrls.length >
      MAX_FILES
    ) {
      showBanner({
        message: ERROR_MESSAGES.MAX_IMAGES,
        type: "warning",
      });
      return;
    }
    setFiles((prev) => [...(prev || []), ...approvedFiles]);
    if (previewUrls.length > 0) {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
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
    setPreviewUrls((prev) => [...prev, ...updatedPreviewUrls]);
    /**
     * previewUrls is deliberately excluded from the dependency
     * array, as it will cause an infinite loop.
     */
  }, [acceptedFiles, product, showBanner]);

  const utils = trpc.useUtils();
  const { mutate: handleLinktoDB } = trpc.product.createImageUrls.useMutation({
    onError: ({ message }) => {
      setPreviewUrls([]);
      showBanner({
        message,
        type: "error",
      });
    },
    onSuccess: () => {
      setPreviewUrls([]);
      setFiles(null);
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
    if (!files?.length) {
      showBanner({
        message: ERROR_MESSAGES.NO_FILES_SELECTED,
        type: "warning",
      });
      return;
    }
    try {
      setIsLoading(true);
      const uploadedUrls = await handleFileUpload(files);
      const validUrls = uploadedUrls.filter((url): url is string => !!url);
      handleLinktoDB({ productId, imageUrls: validUrls });
    } finally {
      setIsLoading(false);
    }
  }, [files, productId, showBanner, handleFileUpload, handleLinktoDB]);

  return (
    <AdminFormWrapper title="Media">
      <div className="mt-6 space-y-6">
        <ImageDropzone
          previewUrls={previewUrls}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          disabled={isLoading}
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
          !!previewUrls.length && (
            <UploadImagesButton
              disabled={isLoading}
              setPreviewUrls={setPreviewUrls}
              handleClick={handleClick}
            >
              IMPORTANT: You must upload images using this button, or they will
              not be saved once you leave this page.
            </UploadImagesButton>
          )}
      </div>
    </AdminFormWrapper>
  );
}
